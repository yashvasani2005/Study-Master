import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import Navbar from './common/Navbar'
// import OpenRoute from "./components/core/Auth/OpenRoute"

import Openroute from './homepagecomponents/auth/Openroute'
import Privaterout from './homepagecomponents/auth/Privateroute'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import Forgotpassword from './components/pages/Forgotpassword'
import Updatepassword from './components/pages/Updatepassword'
import VerifyEmail from './components/pages/VerifyEmail'
import About from './components/pages/About'
import Contactus from './components/pages/Contactus'
import Myprofile from './components/core/Dashboard/Myprofile'
import Dashboard from './components/pages/Dashboard'



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
        <Route path="dashboard/cart" element={<h1>This is my cart</h1>} /> 
        <Route path="/about" element={<Openroute> <About/>  </Openroute> } /> 
        <Route path="/contactus" element={<Openroute> <Contactus/>  </Openroute> } /> 
        <Route element={<Privaterout> <Dashboard/>  </Privaterout> } >   
        
        <Route path="/dashboard/my-profile" element={ <Myprofile/>   } /> 
        
        </Route>
  



      </Routes>
          
    </div>
  )
}

export default App
