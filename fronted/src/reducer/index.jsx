import  {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/Authslice";
import cartreducer from "../slices/Cartslice";
import profilereducer from "../slices/Profileslice";
 import coursereducer from "../slices/Courseslice"

// import authReducer from "../slices/Authslice"                 // importing all reducer which is made into slices;
// import profileReducer from "../slices/Profileslice";
// import cartReducer from "../slices/Cartslice"


     
const rootReducer=combineReducers({
    auth:authReducer,
    cart:cartreducer,
    profile:profilereducer,
    course:coursereducer
    
}) 
export default rootReducer;