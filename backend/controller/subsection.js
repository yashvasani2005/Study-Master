const Section=require("../models/Section")
const Subsection =require("../models/SubSection")
const {imageuploader}=require("../utiles/imageuploader")
require("dotenv").config();


exports.createsubsection = async (req, res) => {
    try {
      // Fetch the data from the request body
      const { sectionid, description, timeduration, title } = req.body;
  
      // Initialize videourl variable
      let videourl;
  
      // Fetch the video from the files
      try {
        if (!req.files || !req.files.videourlfile) {
          throw new Error("Video file is required");
        }
  
        videourl = req.files.videourlfile;
  
        // Log the file information
        console.log("File uploaded: ", videourl);
  
        // Check if the file is a video
        const mimeType = videourl.mimetype;
        const validVideoTypes = ["video/mp4", "video/mkv", "video/x-msvideo", "video/x-flv", "video/quicktime"];
        if (!validVideoTypes.includes(mimeType)) {
          throw new Error("Invalid video file");
        }
  
      } catch (err) {
        console.log("File Error: ", err);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
  
      // Validations
      if (!description || !timeduration || !title || !videourl) {
        return res.status(401).json({
          success: false,
          message: "All fields are required while creating a subsection",
        });
      }
  
      // Upload video to Cloudinary (assuming imageuploader handles videos as well)
      try {
        const uploadvideo = await imageuploader(videourl, process.env.FOLDER_NAME);
        console.log("Upload Result: ", uploadvideo);
  
        // Create the entry
        const updatedsubsection = await Subsection.create({
          title: title,
          timeduration: timeduration,
          description: description,
          videourl: uploadvideo.secure_url,
        });
  
        // Update the Section by object ID of Subsection
        const updatedsection = await Section.findByIdAndUpdate(
          { _id: sectionid },
          {
            $push: {
              subsection: updatedsubsection._id,
            },
          },
          { new: true }
        ).populate("subsection").exec();
  
        // Return response
        return res.status(200).json({
          success: true,
          updatedsection,
          message: "Created the subsection successfully",
        });
  
      } catch (err) {
        console.log("Upload Error: ", err);
        return res.status(500).json({
          success: false,
          message: "Error while uploading the video file",
        });
      }
  
    } catch (err) {
      console.log("Controller Error: ", err);
      return res.status(500).json({
        success: false,
        message: "Error while creating create_subsection in subsection controller",
      });
    }
  };
// update the subsection 

exports.Updatesubsection=async(req,res)=>{
    try{
            
             //fetch the data from request body
  
        const{subSectionId,sectionId,description,timeduration,title}=req.body;
        const subSection = await Subsection.findById(subSectionId)

        //fetch the video from the files
        // const{videourl}=req.files.videourl

        //validations
        if(!description || !timeduration ||!title || !videourl){
            return res.status(401).json({
                 success:false,
                 message:"All fields are require while updating subsection"
            })

        }
        if(!subSection){
            return res.status(404).json({success: false,  message: "SubSection not found", })
          }
      
          if(title !== undefined){
            subSection.title = title
          }
      
          if(description !== undefined){
            subSection.description = description
          }
    
          if(req.files && req.files.videourl !== undefined){
            const videourl = req.files.videourl
            const uploadDetails = await imageuploader( videourl, process.env.FOLDER_NAME )
            subSection.videourl = uploadDetails.secure_url
            subSection.timeduration = `${uploadDetails.duration}`  // duration wala ma bhul hase
          }
          await subSection.save()
        //updated the video url
        
                // const uploadvideo=await upoloadimagetocloudinary(videourl,process.env.FOLDER_NAME)

        //updated the subsection

        const updatedthesection= await Subsection.findByIdAndUpdate({_id:subsectionid},
                                                                     {
                                                                        title:title,
                                                                        timeduration:timeduration,
                                                                        description:description,
                                                                        videourl:uploadDetails.secure_url

                                                                     }   
        )
        //update the section by subsection object ID

        const updatedSection = await Section.findById(sectionId).populate("subSection")


   //retrun response

     return res.status(200).json({
        success:true,
        message:"Update The Subsection SuccessFully"
     })



    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Error while updating the subsection in subsection controller"
        })
    }
}


//Delete the subsection

exports.deletethesubsection=async(req,res)=>{
           try{
                const{subsectionid, sectionId }=req.body;
              //also remove from the section 
              await Section.findByIdAndUpdate( { _id: sectionId },  {$pull: {subsection: subsectionid,},} )

                const subSection =  await Subsection.findOneAndDelete({_id:subsectionid})

     

                // const updatedsection=await Section.findByIdAndDelete({_id:subsectionid} , {},{new:true})
                if(!subSection){
                    return res.status(404).json({ success: false, message: "SubSection not found" })
                  }
            
                  const updatedSection = await Section.findById(sectionId).populate("subsection")

                return res.status(200).json({
                    success:true,
                    updatedSection,
                    message:"Deleting the subsection successfully "
                })

           }
           catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"Error while deleting the subsection in subsection controller"
            })
           }
}