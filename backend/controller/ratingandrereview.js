const RatingandReviwes = require("../models/RatingAndReviews")
const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");


exports.createratingandreview = async (req, res) => {
    try {
        const userid = req.user.user

        const { rating, review, courseid } = req.body;

        //validation

        if (!rating || !review) {
            return res.status(400).json({
                success: false,
                message: "All field are require  While craeting the rating and review in ratingandreview controleer"
            })
        }
        //check the user enrolled or not

        const coursedetail = await Course.findOne(
            {
                _id: courseid,
                studentsEnrolled: { $elemMatch: { $eq: userid } }

            }
        )
        if (!coursedetail) {
            return res.status(400).json({
                success: false,
                message: "Student Not enrolled this course"
            })
        }

        //check useer pehle thij rating and review to apela nathi ne

        const ratingandreview = await RatingandReviwes.findOne({
            user: userid,
            course: courseid,
        })
        if (ratingandreview) {
            return res.status(403).json({
                success: false,
                message: "this student already give the rating and review "
            })
        }

        const ratingreview = await RatingandReviwes.create({
            rating, review,
            course: courseid,
            user: userid,
        })

        //update the course with rating

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            { _id: courseid },
            {
                $push: {
                    ratingandreviwes: ratingreview._id,
                }
            },
            { new: true }
        )

        console.log(updatedCourseDetails);

        //retrun response

        return res.status(200).json({
            success: true,
            message: "Create the rating and review successfully",
            ratingreview
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Error in While craeting the rating and review in ratingandreview controleer"
        })
    }
}


exports.getaveragerating = async (req, res) => {
    try {

        const courseid = req.body.courseid

        const result = await RatingandReviwes.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseid),
                }
            },
            {
                $group: {
                    _id: null,
                    averagerating: { $avg: "$rating" }
                }
            }


        ])

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averagerating: result[0].averagerating

            })
        }
        //if no artingAND REVIEW
        return res.status(200).json({
            success: true,
            message: "Average rating is 0 , means no rating",
            averagerating: 0,
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Error in While get the average rating  in ratingandreview controleer"
        })
    }
}


//getall rating

exports.getallratings = async (req, res) => {
    try {
        const allReviews = await RatingandReviwes.find({}).sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "coursename",
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Error in While get all rating and review    in ratingandreview controleer"
        })
    }
}