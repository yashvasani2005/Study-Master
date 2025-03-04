
import { toast } from "react-hot-toast"
import { ApiConnector } from "../Apiconnector"
import { courseEndpoints } from "../Apis"


const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints 


export const fetchInstructorCourses = async (token) => {
    let result = []
   //const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector( "GET",  GET_ALL_INSTRUCTOR_COURSES_API, null, {Authorization: `Bearer ${token}`,} )
      console.log("INSTRUCTOR COURSES API RESPONSE............", response)
  
      if(!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Courses")
      }
      result = response?.data?.data
    }
     catch (error) {
      console.log("INSTRUCTOR COURSES API ERROR............", error)
      toast.error(error.message)
    }
    // toast.dismiss(toastId)
    return result
  }
  
  
  // delete a course
  export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector("DELETE", DELETE_COURSE_API, data, {Authorization: `Bearer ${token}`, })
      console.log("DELETE COURSE API RESPONSE............", response)
  
      if(!response?.data?.success) {
        throw new Error("Could Not Delete Course")
      }
      toast.success("Course Deleted")
    } 
    catch (error) {
      console.log("DELETE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }
  export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await ApiConnector("GET", COURSE_CATEGORIES_API);
        console.log("COURSE_CATEGORIES_API API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories");
        }

        // Correctly access the categories array
        result = response?.data?.allcategory || [];
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error);
        toast.error(error.message);
    }
    return result;
};


  // export const editcourse = async (data, token) => {
  //   const toastId = toast.loading("Loading...")
  //   try {
  //     const response = await ApiConnector("POST",EDIT_COURSE_API , data, {Authorization: `Bearer ${token}`, })
  //     console.log("Edit COURSE API RESPONSE............", response)
  
  //     if(!response?.data?.success) {
  //       throw new Error("Could Not Edit Course")
  //     }
  //     toast.success("Course Edited Successsfully")
  //   } 
  //   catch (error) {
  //     console.log("Edit COURSE API ERROR............", error)
  //     toast.error(error.message)
  //   }
  //   toast.dismiss(toastId)
  // }
  export const editcourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
      // ✅ Send request to API
      const response = await ApiConnector("POST", EDIT_COURSE_API, data, {
        Authorization: `Bearer ${token}`,
      });
  
      console.log("Edit COURSE API RESPONSE ✅:", response);
  
      if (!response?.data?.success) {
        throw new Error("Could Not Edit Course ❌");
      }
  
      toast.success("Course Edited Successfully ✅");
    } catch (error) {
      console.log("Edit COURSE API ERROR ❌:", error);
      toast.error(error.message);
    }
    toast.dismiss(toastId);
  };
  
  // add the course details
export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await ApiConnector("POST", CREATE_COURSE_API, data, { "Content-Type": "multipart/form-data",   Authorization: `Bearer ${token}`, })
    console.log("CREATE COURSE API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.data
  }
   catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  
  try {
    const response = await ApiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("UPDATE SECTION API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }

    toast.success("Course Section Updated");
    
    // Handle different response structures
    result = response?.data?.updatedCourse || response?.data?.data;

    if (!result) {
      throw new Error("Updated course data is missing from API response.");
    }

  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};



export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  
  try {
    const response = await ApiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE SECTION API RESPONSE:", response); // Log full response

    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }

    toast.success("Course Section Created");

    // Log data structure before assigning
    console.log("API Response Data:", response?.data);

    // Update result with correct data key
    result = response?.data?.updatedCourse || response?.data?.course; 

    if (!result) {
      throw new Error("Updated course data is missing from API response.");
    }

  } catch (error) {
    console.log("CREATE SECTION API ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};
