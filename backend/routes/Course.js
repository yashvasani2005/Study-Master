const express = require("express")
const router = express.Router()

//Route for :- createCourse , Section(add, update, delete) , Subsection(add, update, delete), getAllCourses, getCoursesDetails;
//Route for :- createCategory , showAllCategories , getCategoryPageDetails
//Route for :-  createRating , getAverageRating , getReviews
//Route for :- updateCourseProgress

 
const {createcourse,  showallcourse,  getcoursedetails,  getFullCourseDetails, editCourse, getInstructorCourses,  deleteCourse,} = require("../controller/course")               // Course Controllers Import
const {fetchallcategory, createcategory, categorypagedetails, } = require("../controller/Category")      // Categories Controllers Import
const {createsections,  updatesection,  deletesection, } = require("../controller/Section")                // Sections Controllers Import
const {createsubsection, Updatesubsection,  deletethesubsection, } = require("../controller/subsection")     // Sub-Sections Controllers Import
const {createratingandreview,  getaveragerating, getallratings, } = require("../controller/ratingandrereview")        // Rating Controllers Import
const { auth, isInstructor, isstudent, isAdmin } = require("../middleware/auth")                          // Importing Middlewares
// const {updateCourseProgress } = require("../controller/courseProgress");


// ********************************************************************************************************
//                                      Course routes (only by Instructors)                               *
// ********************************************************************************************************
router.post("/createCourse", auth, isInstructor, createcourse)                            // Courses can Only be Created by Instructors
router.post("/addSection", auth, isInstructor, createsections)                            //Add a Section to a Course
router.post("/updateSection", auth, isInstructor, updatesection)                         // Update a Section
router.post("/deleteSection", auth, isInstructor, deletesection)                         // Delete a Section
router.post("/updateSubSection", auth, isInstructor, Updatesubsection)                   // Edit Sub Section
router.post("/deleteSubSection", auth, isInstructor, deletethesubsection)
router.post("/addSubSection", auth, isInstructor, createsubsection)
router.get("/getAllCourses", showallcourse)                                               // Get all Registered Courses
router.post("/getCourseDetails", getcoursedetails)                                        // Get Details for a Specific Courses

// router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// router.post("/editCourse", auth, isInstructor, editCourse)                              // Edit Course routes
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)           // Get all Courses Under a Specific Instructor
// router.delete("/deleteCourse", deleteCourse)                                            // Delete a Course
// router.post("/updateCourseProgress", auth, isstudent, updateCourseProgress);



// ********************************************************************************************************
//                                      Category routes (Only by Admin)                                   *
// ********************************************************************************************************
router.post("/createCategory", auth, isAdmin, createcategory)
router.get("/showAllCategories", fetchallcategory)
router.post("/getCategoryPageDetails", categorypagedetails)


// ********************************************************************************************************
//                                      Rating and Review (only by Student)                               *
// ********************************************************************************************************
router.post("/createRating", auth, isstudent, createratingandreview)
router.get("/getAverageRating", getaveragerating)
router.get("/getReviews", getallratings)


module.exports = router