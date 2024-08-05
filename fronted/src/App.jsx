import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import Navbar from './common/Navbar'
// import OpenRoute from "./components/core/Auth/OpenRoute"

import Openroute from './homepagecomponents/auth/Openroute'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import Forgotpassword from './components/pages/Forgotpassword'
import Updatepassword from './components/pages/Updatepassword'
import VerifyEmail from './components/pages/VerifyEmail'
import Myprofile from './components/core/dashboard/Myprofile'
import About from './components/pages/About'

function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path="signup" element = { <Openroute> <Signup /> </Openroute> } />
        <Route path="login" element = { <Openroute> <Login /> </Openroute> } />
        <Route path="forgot-password" element = { <Openroute> <Forgotpassword /> </Openroute> } />
        <Route path="verify-email" element = { <Openroute> <VerifyEmail /> </Openroute> } />
        <Route path="update-password/:id" element = { <Openroute> <Updatepassword /> </Openroute> } />
        <Route path="dashboard/my-profile" element={ < Myprofile />} /> 
        <Route path="dashboard/cart" element={<h1>This is my cart</h1>} /> 
        <Route path="/about" element={<Openroute> <About/>  </Openroute> } /> 

      </Routes>
          
    </div>
  )
}

export default App
