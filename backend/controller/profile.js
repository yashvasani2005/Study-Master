const Profile=require("../models/Profile")
const User=require("../models/User")
const {imageuploader}=require("../utiles/imageuploader")

exports.createtheprofile=async(req,res)=>{
    try{
        //fetch data
         const{dateofbirth="", about="", contactnumber, gender}=req.body
        //fetch the userid
    const {userid}=req.user.id
            //validations

            if(!gender || !gender || !userid){
                return res.status(401).json({
                        success:false,
                        message:"All field are required while creating profile"
                })
            }
        //fetch the usedata
       const userdata=await User.findById({userid})
        //fetch the profileID
         const profileID=userdata.additionaldetails;           
        //fetch the Profiledata
        const profiledata=await Profile.findById({profileID})



        //update the data

        profiledata.dateofbirth=dateofbirth;
        profiledata.about=about;
        profiledata.gender=gender;
        profiledata.contactnumber=contactnumber;

        await profiledata.save();


        //return response

        return res.status(200).json({
            success:true,
            message:"Create the Profile Succesfully"
        })

    }
    catch(err){
        console.log(err)
    return res.status(500).json({
        success:false,
        message:"Error while the profile in the profile controller"
    })
          
    }
}

//delete the account


exports.deleteProfile=async(req,res)=>{
    try{
              const {id}=req.user.id

         const userdetails=   await User.findById({_id:id})

         if(!userdetails){
           return res.status(401).json(
            {
           success:false,
            message:"User Is not found"
            }
           )

         }
         //delete the profile 

         await Profile.findByIdAndDelete({_id:userdetails.additionaldetails})
         //TODO :unrolled user

         //delete the user

         await User.findByIdAndDelete({_id:id})

            return res.status(200).json({
                success:true,
                message:"Delete the Profile succesfully"
            })

    }
    catch(err){
        console.log(err)

        return res.status(500).json({
            success:false,
            message:"Error while deleting account in rpofile contoller "
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
      const id = req.user.id
      const userDetails = await User.findById(id).populate("additionaldetails").exec()
         
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      })
    } 
    catch (error) {
        console.log(error)
      return res.status(500).json({
        success: false,
        message: "error while get the all user details",
      })
    }
  }
  exports.updateProfile = async (req, res) => {
    try {
      const {firstname = "",  lastname = "", dateofbirth = "",  about = "",  contactnumber = "",  gender = "", } = req.body
      const id = req.user.id
  
      // Find the profile by id
      const userDetails = await User.findById(id)
      const profile = await Profile.findById(userDetails.additionaldetails)
  
      const user = await User.findByIdAndUpdate(id, { firstname,  lastname, })
        
      await user.save()
  
      // Update the profile fields
      profile.dateofbirth = dateofbirth
      profile.about = about
      profile.contactnumber = contactnumber
      profile.gender = gender
  
      await profile.save()                                     // Save the updated profile
  
      // Find the updated user details
      const updatedUserDetails = await User.findById(id).populate("additionaldetails").exec()
        
      return res.json({
        success: true,
        message: "Profile updated successfully",
        updatedUserDetails,
      })
    } 
    catch (error) {
      console.log(error)
      console.log("Error in update the profile")
      return res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  }
  

  exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await imageuploader(displayPicture,  process.env.FOLDER_NAME,  1000,  1000 )
         
      const updatedProfile = await User.findByIdAndUpdate({ _id: userId }, { image: image.secure_url },  { new: true })
       
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } 
    catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  
  exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({ _id: userId, })
          .populate({
            path: "courses",
            populate: {
              path: "coursecontent",
              populate: {
                path: "subsection",
              },
            },
          })
          .exec() 
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for(var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for(var j = 0; j < userDetails.courses[i].courseContent.length; j++){
            totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
            SubsectionLength +=  userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({courseID: userDetails.courses[i]._id,  userId: userId,})
        courseProgressCount = courseProgressCount?.completedVideos.length
        if(SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } 
        else {                                             // To make it up to 2 decimal point 
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =  Math.round( (courseProgressCount / SubsectionLength) * 100 * multiplier ) / multiplier
        }
      }
  
      if(!userDetails) {
         return res.status(400).json({success: false,  message: `Could not find user with id: ${userDetails}`,})
      }
  
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
        message:"fecth the enrolled course detail successfully"
      })
    } 
    catch (error) {
      console.log(error);
      console.log("Error while the fetch details of enrolled course details")
      return res.status(500).json({
        success: false,
        message: error.message,
        
      })
    }
  }
  