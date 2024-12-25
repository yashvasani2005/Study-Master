import Allsteps from "./Allsteps";
import "./Mainindex.css"

export default function Mainindex() {

  return (
   <div>
         <h2 className="mainbody_heading">Add Course</h2>
         <div className="all_steps_creating_course">
             <Allsteps/>    
         </div>
         <div className="course_ceating_description">
            <p className="paragraph">Here is your all steps for creating the course</p>
            <ul>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>    
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
            </ul>
         </div>
   </div>
  );
}

