const jwt=require("jsonwebtoken")
require("dotenv").config();
const User=require("../models/User")

//auth

exports.auth=async(req,res,next)=>{
      try{
         const token=req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer","");

           if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Mising"

            })
           }

           try{
               const decode=await jwt.verify(token,process.env.JWT_SECRETE)
               console.log(decode);
               req.user=decode
             
           }
           catch(err)
               {
                console.log(err)
                return res.status(401).json({
                    success:false,
                    message:"token is invalid"
                })
               }

               next();
      }
      catch(err){
        console.log(err)
        console.log("error in auth in middleware");
        return res.status(500).json({
            success:false,
            message:"something went wrong while  creating auth "

        })
      }
}



//is Student


exports.isstudent=async(req,res,next)=>{

     try{
        if(req.user.accounttype !=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route Only for Students"
            })
        }
        next();

     }
     catch(err){
        res.status(500).json({
            success:false,
            message:"Error in isStudent middleware"
        })
     }

}



// for instuctore

exports.isInstructor=async(req,res,next)=>{

    try{
       if(req.user.accounttype !=="Instructor"){
           return res.status(401).json({
               success:false,
               message:"This is protected route Only for Instructors"
           })
       }
       next();

    }
    catch(err){
       res.status(500).json({
           success:false,
           message:"Error in isInstructor middleware"
       })
    }

}

//for admin

exports.isAdmin=async(req,res,next)=>{

    try{
       if(req.user.accounttype !=="Admin"){
           return res.status(401).json({
               success:false,
               message:"This is protected route Only for Admin"
           })
       }
       next();

    }
    catch(err){
       res.status(500).json({
           success:false,
           message:"Error in isAdmin middleware"
       })
    }

}

