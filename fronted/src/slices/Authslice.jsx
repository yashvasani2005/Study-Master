import {createSlice} from "@reduxjs/toolkit"

const initialState={
    signupData: null,                              
    loading: false,   
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
}

const Authslice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload;
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
          },
          setLoading(state, value) {
            state.loading = value.payload;
          },
    }
});
export const { setSignupData, setLoading, setToken } = Authslice.actions;
export default Authslice.reducer;
