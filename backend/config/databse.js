const mongoose =require("mongoose")

require("dotenv").config(); 

const dbconnect=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/StudyMaster",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("DB connection Suceesfully"))
    .catch((error)=>{
        console.log("Error in Db connection")
        console.log(error);
        process.exit(1);
    }) 

}
module.exports=dbconnect;