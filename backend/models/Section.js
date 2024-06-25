const mongoose =require("mongoose")

const Sectionschema=new mongoose.Schema({
      sectionName:{
        type:String
      },
      subsection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
        required:true

      }]
})
module.exports=mongoose.model("Section",Sectionschema)