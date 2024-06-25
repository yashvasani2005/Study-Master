const nodemailer=require("nodemailer")

const MailSender=async(email,title,body)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }

        })
                 let info=await transporter.sendMail({
                    from:" YASH VASANI - Amreli, Gujarat, India",
                    to:`${email}`,
                    subject:`${title}`,
                    html: `<h1>Heyy , How are you </h1> ${body}`
                 })
                 console.log(info);
                 return info;
    }
    catch(err){
        console.error(err)
        console.log("error in mailsender int utiles")

    }
}
module.exports=MailSender;