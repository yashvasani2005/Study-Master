const Course=require("../models/Course")
const Category=require("../models/Category")
const User=require("../models/User")
const {imageuploader}=require("../utiles/imageuploader")
require("dotenv").config();

exports.createcourse = async (req, res) => {
    try {
        const {
            coursename,
            coursedescription,
            whatyouwilllearn,
            price,
            tag: _tag,
            category,
            // status
            // instructions: _instructions
        } = req.body;

        const thumbnail = req.files.thumbnailimage;

        // Validation
        if (!coursename || !coursedescription || !whatyouwilllearn || !price || !_tag || !thumbnail || !category ) {
            return res.status(401).json({
                success: false,
                message: "All Fields Are Required"
            });
        }

        // Check for instructor
        const userid = req.user.id;
        const instructordetails = await User.findById(userid, { accounttype: "Instructor" });
        console.log("Instructor Details is Here --->>>", instructordetails);

        if (!instructordetails) {
            return res.status(401).json({
                success: false,
                message: "Instructor Details Not Found"
            });
        }
        // if(!status || status === undefined){
        //     status = "Draft"
        //   }

        // Checking for Category
        const categorydetails = await Category.findById(category);
        if (!categorydetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found"
            });
        }

        // Upload image to Cloudinary
        const thumbnailimage = await imageuploader(thumbnail, process.env.FOLDER_NAME);

        // Create the course
        const newcourse = await Course.create({
            coursename,
            coursedescription,
            instructor: instructordetails._id,
            whatyouwilllearn,
            price,
            tag: _tag,
            category: categorydetails._id,
            thumbnail: thumbnailimage.secure_url,
            // status: status,
        });

        // Update the instructor
        await User.findByIdAndUpdate(
            { _id: instructordetails._id },
            { $push: { courses: newcourse._id } },
            { new: true }
        );

        // Update the category schema
        const categoryDetails2 = await Category.findByIdAndUpdate(
            { _id: category },
            { $push: { courses: newcourse._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            data: newcourse,
            message: "New Course Created Successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error while creating course in course controller"
        });
    }
};

//getall the courses handler

exports.showallcourse=async(req,res)=>{
       try{ 

        const allcourse=await Course.find({},
                                          {
                                            coursename:true,
                                          price:true,
                                          thumbnail:true,
                                          ratingandreviwes:true,
                                          studentsEnrolled:true,
                                          instructor:true,
                                          }
        ).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            allcourse,
            message:"ALL corses Fetch the succesfully"
        })
       }
       catch(err){
            console.log(err)
        return res.status(500).json({
            success:false,
            message:"Error while fetch the all courses"
        })
       }
}

//get course details

exports.getcoursedetails=async(req,res)=>{
      try{
        const {courseid}=req.body;

        const coursedetails=await Course.findById(
                {_id:courseid},
        
        ) .populate(
               {
                path:"instructor",
                populate:{
                path:"additionaldetails",
                }
               }
        )
        .populate("category")
        // .populate("ratingandreviwes")
        .populate({
            path:"coursecontent",
            populate:{
                path:"subsection"
            }
        }).exec();
        
         if(!coursedetails){
            return res.status(400).json({
                success:false,
                message:"could not find the coursedeatils"
            })
         }
         
        return res.status(200).json({
            success:true,
            data:coursedetails,
            message:"Get the course details succesfully"
        })

      }
      catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,

            message:"Error while get the course details in course controller "
        })
      }
}