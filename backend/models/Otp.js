const mongoose =require("mongoose");
const MailSender = require("../utiles/MailSender");

const otpschema=new mongoose.Schema({
              email:{
                type:String,
                required:true
              },
              otp:{
                type:String,
                required:true
              },
              created_at:{
                type:String,
                default:Date.now(),
                expires:5*60,
              },
    
})

async function verificationmailotp(email,otp){
    try{
              const response=await MailSender(email,"Verification Mail from the Yash Vasani",otp)
              console.log("your verrification response is --->", response)
    }
    catch(err){
        console.error(err);
        console.log("error in while sending the verifivation otp mail then show the error")
    }
}
otpschema.pre("save", async function(next){
    await verificationmailotp(this.email,this.otp);
    next();
})

module.exports=mongoose.model("Otp",otpschema)