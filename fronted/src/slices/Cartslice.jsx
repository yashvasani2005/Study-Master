import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-hot-toast";

const initialState={
      totalitems:localStorage.getItem("totalitems")? JSON.parse(localStorage.getItem("totalitems")):0,
      cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
      total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
}

const Cartslice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers: {

        addToCart: (state, action) => {
          const course = action.payload
          const index = state.cart.findIndex((item) => item._id === course._id)
    
          if(index >= 0){                                                  // If the course is already in the cart, do not modify the quantity
            toast.error("Course already in cart")
            return
          }
          // If the course is not in the cart, add it to the cart
          state.cart.push(course)
          state.totalitems++                                                  // Update the total quantity and price
          state.total += course.price
         
          localStorage.setItem("cart", JSON.stringify(state.cart))             // Update to localstorage
          localStorage.setItem("total", JSON.stringify(state.total))
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
          
          toast.success("Course added to cart")                                // show toast
        },
    
        removeFromCart: (state, action) => {
          const courseId = action.payload
          const index = state.cart.findIndex((item) => item._id === courseId)
    
          if (index >= 0) {                                                     // If the course is found in the cart, remove it
            state.totalitems--
            state.total -= state.cart[index].price
            state.cart.splice(index, 1)
                                           
            localStorage.setItem("cart", JSON.stringify(state.cart))             // Update to localstorage
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            
            toast.success("Course removed from cart")                            // show toast  
          }
        },
    
        resetCart: (state) => {
          state.cart = []
          state.total = 0
          state.totalitems = 0
          
          localStorage.removeItem("cart")                // Update to localstorage
          localStorage.removeItem("total")
          localStorage.removeItem("totalItems")
        },
      },
    })
export const {addToCart, removeFromCart, resetCart}=Cartslice.actions;
export default Cartslice.reducer;
