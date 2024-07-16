const User=require("../models/User")
const Otp=require("../models/Otp")
const otpgenerator=require("otp-generator")
const  bcrypt  = require("bcrypt")
const Profile = require("../models/Profile")
const jwt=require("jsonwebtoken")
require("dotenv").config();

exports.Otpgenerator=async(req,res)=>{


    try{

         //fetch the email from the req.body
            console.log("Req Arruced")
         const {email}=req.body
           
         //validation of mail "user is already exixt or not"

         const verifyemail=await User.findOne({email});

         if(verifyemail){
            return res.status(500).json({
                success:false,
                message:"User Is Already Exist please try with onther Email"
            })
         }
  

         //generate the Otp
         var otp=otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
         })
         console.log("OTP ------->>>>>>>>>",otp)

         let verifyotp=await Otp.findOne({otp:otp})

         while(verifyotp){
            otp=otpgenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
             })
             verifyotp=await Otp.findOne({otp:otp})
         }
     
        const payload={email,otp}

        const otpbody=await Otp.create(payload)
        console.log("OTP body is here -->>",otpbody)

       return res.status(200).json({
        success:true,
        message:"Otp Sent Succesfully"

        })


    

    }
    catch(err){
        console.log("your error is while creating or generate the otp and ++++++ error is----->",err)
        res.status(500).json({
            success:false,
            message:"error che otp creating ma"
        })

    }


}
//signup controller

exports.signup=async(req,res)=>{

     try{
        // const {contactnumber,
        //     about,
        //     dateofbirth,
        //     gender
        // }=req.body;

        // const profile={contactnumber,about,dateofbirth,gender};

        const{
            firstname,
            lastname,
            email,
            password,
            otp,
            confirmpassword,
            accounttype,
            contactnumber,
       
        }=req.body


        // validation
        if(!firstname || !lastname ||!email|| !password || !confirmpassword || !otp ){
            return res.status(403).json({
                success:false,
                message:"please fill the All the details carefully"
            })
        }

        //user is already exist or not 

         const verifyemail=await User.findOne({email})
               if(verifyemail){
                return res.status(400).json({
                    success:false,
                    message:"User Alrready exist please try with onther email"
                })
               }

           //password validation both password must be same
           
           if(password !== confirmpassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirmpassword value does not match,Please try again"
            })
           }

         //find most recent otp 

            const recentotp=await Otp.find({email}).sort({created_at:-1}).limit(1);
            console.log(recentotp)

            //validate Otp

                if(recentotp.length ==0){
                    //otp not found
                    return res.status(400).json({
                        success:false,
                        message:"OTP not found"
                    })

                }else if(otp !== recentotp[0].otp){
                    return  res.status(400).json({
                        success:false,
                        message:"Otp not maching"
                    })
                }
   
                   //hash password
            const hashpassword=await bcrypt.hash(password,10);


              //create the Entry in the database
                
                const profiledetail=await Profile.create({
                    gender:null,
                    dateofbirth:null,
                    about:null,
                    contactnumber:null

                })

            const user=await User.create({
                firstname,
                lastname,
                email,
                password:hashpassword,
                confirmpassword,
                accounttype,
                contactnumber,
                additionaldetails:profiledetail._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
                 

            })
                     console.log("User data is here--->>>",user)

    return res.status(200).json({
           success:true,
           message:"User Registered Successfully"
    })
     }
     catch(err){
        console.log(err)
        console.log("error in signup controller while signup")
        return  res.status(500).json({
            success:false,
            message:"error in sign up contoller"
        })
     }

}



// login controller

exports.login=async(req,res)=>{
            try{
                const {email,password}=req.body;

                //validation
           
                if(!email || !password){
                   return res.status(403).json({
                       success:false,
                       message:"All field are require in Login time"
                   })
                }
           
                //check user is registerd or not
           
                const user=await User.findOne({email}).populate("additionaldetails")
           
                if(!user){
                   return res.json({
                       success:false,
                       message:"user is not Registered , first sign_up before login"
                   })
                }
                //generate the JWT token And macthing the password
           
                if(await bcrypt.compare(password, user.password)){
                      const payloadd={
                         email:user.email  ,
                         id:user.id,
                         accounttype:user.accounttype,
           
           
                      }
                      const token =await jwt.sign(payloadd,process.env.JWT_SECRETE,{
                             expiresIn:"3h"
                      })
                      
                         user.token=token
                         user.password=undefined
             
                           const options={
                                expires:new Date(Date.now() + 3*24*60*60*1000),
                                httpOnly:true
                           }
           
                       res.cookie("token",token,options).status(200).json({
                           success:true,
                           token,
                           user,
                           message:"Login Succesfully"
                       })  
                }
                else{
                    return res.status(401).json({
                        success:false,
                        message:"Password incorrect",
                    })
                }
            }
            catch(err){
                console.log(err);
                console.log("Error in while login ")
                return res.status(500).json({
                    success:false,
                    message:"Erro che login controller ma "
                })
            }

}

//reset password means whole password reseting






