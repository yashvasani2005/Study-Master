// import loginImg from "../assets/"
// import loginImg from "../../assets/Images/login.avif"
import loginImg from "../../../src/assets/Images/login.avif"
// import Template from "../components/core/Auth/Template"
import Template from "../../homepagecomponents/auth/Template"

function Login({setIsLoggedIn}){
  return (

    <Template title="Welcome Back"  description1="Build skills for today, tomorrow, and beyond." description2="Education to future-proof your career."   image = {loginImg} formtype = "login"/>

  )}

export default Login