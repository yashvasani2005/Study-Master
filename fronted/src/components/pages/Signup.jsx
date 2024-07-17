// import signupImg from "../assets/Images/signup.webp"
// import signupImg from "/fronted/src/assets/Images/Signup.avif"
import signupImg from "../../../src/assets/Images/Signup.avif"
import Template from "../../homepagecomponents/auth/Template"


function Signup() {
  return (

    <Template title = "Join the millions learning to code with StudyMaster for free" description1 = "Build skills for today, tomorrow, and beyond."  description2 = "Education to future-proof your career." image = {signupImg} formType = "signup" />      
       
 )}


 
export default Signup