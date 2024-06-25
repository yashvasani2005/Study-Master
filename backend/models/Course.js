const mongoose =require("mongoose")

const courseschema=new mongoose.Schema({
              coursename:{
                type:String
              },
              coursedescription:{
                type:String,
              },
              instructor:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
              },
              whatyouwilllearn:{
                  type:String
              },
              coursecontent:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Section"
                }
              ],
              ratingandreviwes:[
                {
                  type:mongoose.Schema.Types.ObjectId,
                  ref:"RatingAndReviews "
                }
              ],
              price:{
                type:Number
              },
              thumbnail:{
                type:String,
              },
              tag:{
                type:[String],
                required:true,
              },
              category:{
                type:mongoose.Schema.Types.ObjectId,
      
                ref:"Category"

              },
              studentsEnrolled:[{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"User"
              }],
              instructions: {
                type: [String],
              },
              status: {
                type: String,
                enum: ["Draft", "Published"],
              },
              createdAt: {
                type:Date,
                default:Date.now
              },


})
module.exports=mongoose.model("Course",courseschema)