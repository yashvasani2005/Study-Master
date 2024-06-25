const mongoose =require("mongoose")

const SubSectionschema=new mongoose.Schema({
              title:{
                type:String
              },
              timeduration:{
                type:String,
              },
              description:{
                type:String,
                trim:true
              },
              videourl:{
                type:String,

              }
})
module.exports=mongoose.model("SubSection",SubSectionschema)