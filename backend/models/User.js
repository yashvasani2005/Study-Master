const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,

  },
  accounttype: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionaldetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
  ],
  image: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  resetpasswordexpire: {
    type: Date
  },
  courseprogress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress"
    }
  ],

})
module.exports = mongoose.model("User", userschema)