import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}
 
const Profileslice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.token=value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    }
});
export const {setUser,setLoading}=Profileslice.actions;
export default Profileslice.reducer;
