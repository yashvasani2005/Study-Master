import { toast } from "react-hot-toast"


import { setLoading } from "../../slices/Profileslice"
import { setUser } from "../../slices/Profileslice"

import { ApiConnector } from "../Apiconnector"
import { profileEndpoints } from "../Apis"
import { logout } from "./authAPI"



const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints




export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
      const response = await ApiConnector( "GET", GET_USER_ENROLLED_COURSES_API, null, {Authorization: `Bearer ${token}`,} )   
      console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    
      if(!response.data.success) {
        throw new Error(response.data.message)
        }
      result = response.data.data
    } 
    catch(error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
   toast.dismiss(toastId)
    return result
  }