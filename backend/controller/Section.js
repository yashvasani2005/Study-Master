const Course=require("../models/Course")
const Section=require("../models/Section")



exports.createsections=async(req,res)=>{
    try{
        //fethc the data

        const {sectionName,courseid}=req.body

        //validations

        if(!sectionName || !courseid){
            return res.status(401).json({
                success:false,
                message:"All field are required"
            })
        }
        //create the section

        const newsection =await Section.create({sectionName})
        console.log("your new section is here---->>>",newsection)

        //update the course with section ObjectID

        const updatedcoursedetails=await Course.findByIdAndUpdate({ _id:courseid},
                                                                    {
                                                                        $push:{
                                                                            coursecontent:newsection._id
                                                                        }
                                                                    },
                                                                    {new:true}
        ).populate({
            path:"coursecontent",
            populate:{
                path:"subsection",
            },
        })  .exec();
        //TODO : hW use populate to replace sections/sub-sections both in the updatedcoursedetails

        return res.status(200).json({
            success:true,
            message:"Section Created Succesfully",
            updatedcoursedetails,
            

        })


    }
    catch(err){
        console.log(err)

        return res.status(500).json({
            success:false,
            message:"Erro while creating section in section controller",
            err:err.message,
        })
    }
}


//update the section 


exports.updatesection=async(req,res)=>{
    try{

              //fethc the data

              const {sectionName,sectionid}=req.body

              //validations
      
              if(!sectionName || !sectionid){
                  return res.status(401).json({
                      success:false,
                      message:"All field are required while updating the section"
                  })
              }

              //update the section

              const updatedsection =await Section.findByIdAndUpdate(
                                            {sectionid},        
                                             {sectionName},
                                              {new:true}
                                            )
            return res.status(200).json({
                success:true,
                message:"Update the section seccesfully",
                updatedsection,
            })
    }
    catch(err){
        console.log(err)
        
        return res.status(500).json({
            success:false,
            message:"Erro while updating section in section controller"
        })

    }
}

//deletesection 
exports.deletesection = async (req, res) => {
    try {
        // Fetch the data
        const { sectionid } = req.body;

        // Validations
        if (!sectionid) {
            return res.status(401).json({
                success: false,
                message: "All fields are required while deleting the section"
            });
        }

        // Delete the section
        await Section.findByIdAndDelete(sectionid);

        // TODO: Do we need to delete the entry in the Course schema?
        const updatedcoursedetails = await Course.findOneAndUpdate(
            { "coursecontent._id": sectionid },
            { $pull: { coursecontent: sectionid } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Deleted the section successfully",
            updatedcoursedetails
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Error while deleting section in section controller"
        });
    }
};

