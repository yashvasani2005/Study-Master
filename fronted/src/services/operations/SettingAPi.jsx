
import { toast } from "react-hot-toast"
import { settingsEndpoints } from "../Apis"
import { ApiConnector } from "../Apiconnector"
import { setUser } from "../../slices/Profileslice"
import { configureStore } from "@reduxjs/toolkit"


const { UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API,  CHANGE_PASSWORD_API,  DELETE_PROFILE_API,} = settingsEndpoints
export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await ApiConnector("PUT", UPDATE_DISPLAY_PICTURE_API,
                        formData,
                        {
                          "Content-Type": "multipart/form-data",
                          Authorization: `Bearer ${token}`,
                        }
                      )
        console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............",  response )
           
        if(!response.data.success){
          throw new Error(response.data.message)
          }
        toast.success("Display Picture Updated Successfully")
        dispatch(setUser(response.data.data))
      }
       catch(error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
  }
  
export function updateProfile(token, formdata){
   return async(dispatch)=>{
      const toastID=toast.loading("Loaading..")
        
      try{
        const response = await ApiConnector("PUT", CHANGE_PASSWORD_API, formdata, { Authorization: `Bearer ${token}`, })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if(!response.data.success) {
          throw new Error(response.data.message)
        }

        const userImage = response.data.updatedUserDetails.image ? response.data.updatedUserDetails.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        console.log(userImage);
        console.log(response.data.updatedUserDetails.image);
        dispatch(
          setUser({ ...response.data.updatedUserDetails, image: userImage })
        )
        toast.success("Profile Updated Successfully")

      }
      catch(error){
        console.log(error.message);
        console.log(error)
        toast.error("Could Not Update The Profile..")
      }
      toast.dismiss(toastID)
   }
}  

export async function changePassword(token, formdata){
    const toastId = toast.loading("Loading...")
    try {
      const response = await ApiConnector("POST", CHANGE_PASSWORD_API, formdata, { Authorization: `Bearer ${token}`, })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
 }  
 