const User=require("../models/User")
const Course=require("../models/Course")
const MailSender = require("../utiles/MailSender");
const {instance}=require("../config/razorpay")
const {courseenroll}=require("../Email/courseenrollement");
const { default: mongoose } = require("mongoose");

exports.capturePayment=async(req,res)=>{
     try{
       const {courseid}=req.body;
        const userid=req.user.id;
  
        //validation for courseid
        if(!courseid){
            return res.status(404).json({
                success:false,
                message:"Please Give the COURSE_ID"
            })
        }

        //valid coursedetails
        let course;
        try{
            course=await Course.findById(courseid)

            if(! course){
                return res.status(401).json({
                    success:false,
                    message:"Could not find the Course"
                })
            }
          
             const uid=new mongoose.Types.ObjectId(userid);
             //user already for the same course
             if(course.studentsEnrolled.includes(uid))
                   {
                      return res.status(500).json({
                        success:false,
                        message:"Student Is Already Enrolled"
                      })
                   }

        }
        catch(err){
            console.log(err)

            return res.status(500).json({
                success:false,
                message:"Error while validatet the coursedetails"
            })
        }
        
        //create the order

        const amount=course.price
        const currency="INR"

        const options ={
            amount:amount*100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseID:courseid,
                userid,
            }
        }


        try{ 
        //intitate the payment using RAZORPAY

        const Paymentresponse =await instance.orders.create(options);
        console.log(Paymentresponse);

        return res.status(200).json({
            success:true,
            coursename:course.coursename,
            coursedescription:course.coursedescription,
            thumbnail:course.thumbnail,
            orderID:Paymentresponse.id,
            currency:Paymentresponse.currency,
            amount:Paymentresponse.amount



        })

     }
     catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error while the Intiatite the payment in payment controller"
        })
     }

     }
     catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"Erro while capturing the payment in payment controller"
        })
     }
}

exports.verifythesignature=async(req,res)=>{
    const webhooksecret="12345678";
    const signature=req.headers["x-razorpay-signature"];

    const shasum=crypto.createHmac("sha256",webhooksecret)

    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex")

    if(signature===digest){
        console.log("Payment is Authorized");

        const{userid,courseid}=req.body.payload.payment.entity.notes

        try{
             
            //find the course and enroll the student

            const enrolledcourse=await Course.findOneAndUpdate({_id:courseid},{$push:{studentsEnrolled:userid}},{new:true});

            if(!enrolledcourse){
                return res.status(500).json({
                    success:false,
                    message:"cccccourse not found"
                })
            }
            console.log(enrolledcourse)

            //find the student and add the course to their list enrolled course

            const enrolledstudent=await User.findById(
                   {_id:userid},
                   {
                    $push:{
                        courses:courseid,
                    }
                   },
                   {new:true}
            )

            console.log(enrolledstudent);
             
            //mail send kard do confirmation

            const emailresponse= await MailSender(
                           enrolledstudent.email,
                           "Congratulation from study master",
                           "Now you can go to the your enrolled course"
            )
                console.log(emailresponse)

                return res.status(200).json({
                    success:true,
                    message:"Signature verified and Course ADDEd"
                })

        }
        catch(err){
            console.log(err)

            return res.status(500).json({
                success:false,
                message:"Error while verify the signature in the signature and digest"
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request"
        })
    }
}
exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderID, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderID || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderID, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}
