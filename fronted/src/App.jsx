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

function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path="signup" element = { <Openroute> <Signup /> </Openroute> } />
        <Route path="login" element = { <Openroute> <Login /> </Openroute> } />
        <Route path="forgot-password" element = { <Openroute> <Forgotpassword /> </Openroute> } />
      </Routes>
          
    </div>
  )
}

export default App
