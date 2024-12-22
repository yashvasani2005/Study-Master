import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import Error from './components/pages/Error'
import MYProfile from './components/core/Dashboard/MYProfile'
import Dashboard from './components/pages/Dashboard'
// import Editprofile from './components/core/Settings/Editprofile'
import Mainbody from './components/core/Settings/Mainbody'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/Constant'
import Cartmainbody from './components/core/Dashboard/Cart/Cartmainbody'
import MyCourse from './components/core/Dashboard/MyCourse'
import Mainindex from './components/core/Dashboard/AddCourse/Mainindex'


function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="signup" element={<Openroute> <Signup /> </Openroute>} />
        <Route path="login" element={<Openroute> <Login /> </Openroute>} />
        <Route path="forgot-password" element={<Openroute> <Forgotpassword /> </Openroute>} />
        <Route path="verify-email" element={<Openroute> <VerifyEmail /> </Openroute>} />
        <Route path="update-password/:id" element={<Openroute> <Updatepassword /> </Openroute>} />

        <Route path="/about" element={<Openroute> <About />  </Openroute>} />
        <Route path="/contactus" element={<Openroute> <Contactus />  </Openroute>} />

        <Route element={<Privaterout> <Dashboard />  </Privaterout>} >

          <Route path="/dashboard/my-profile" element={<MYProfile />} />
          <Route path="/dashboard/settings" element={<Mainbody />} />

          {
            user?.accounttype === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/cart" element={<Cartmainbody />} />
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
          }
          {user?.accounttype === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
        {/* <Route path="dashboard/instructor" element={<Instructor />} /> */}
              <Route path="dashboard/add-course" element={<Mainindex />} />
              {/* <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />  */}
              <Route path="dashboard/my-courses" element={<MyCourse />} />
            </>
          )
          }

        </Route>

        <Route path="*" element={<Error />} />






      </Routes>

    </div>
  )
}

export default App
