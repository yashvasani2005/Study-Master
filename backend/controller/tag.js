const Tag=require("../models/Tag")

//create the  tags
exports.createtag=async(req,res)=>{
   try{
    const {name,description}=req.body;

    if(!name || !description){
        return res.status(401).json({
            success:false,
            message:"All Fields Are required"
        })
    }

    const tag=await Tag.create({name:name},{description:description})
  console.log(tag)
    return res.status(200).json({
        success:true,
        message:"Tag Created Succesfully",
        tag
    })

   }
   catch(err){
    console.log(err)
    return res.status(500).json({
    success:false,
    message:"Error in while creating tags, Something went wrong"
    })
   }

    
}

//fetch all the tags

exports.fetchalltag=async(req,res)=>{
    try{
     const alltag=await Tag.find({},{name:true,description:true})
 
     return res.status(200).json({
         success:true,
         message:"Fetch All The Tags Succesfully",
         alltag
     })
 
    }
    catch(err){
     console.log(err)
     return res.status(500).json({
     success:false,
     message:"Error in while fetch (find) all tags, Something went wrong"
     })
    }
 
     
 }

 