
import React from "react"
import { Link } from 'react-router-dom'
import { FaCircleArrowRight } from 'react-icons/fa6';
import './Becomeainstructor.css'

function Becomeainstructor() {
    return (
        <div className="main">
            <div className="becomeleft">
                <img src="./Timeline/instructor.jpg" alt="Instructor" />
            </div>
            <div className="becomeright">
                <h2>Become an <span className='headingspan'>instructor</span></h2>
                <p>Instructors from around the world teach millions of students on Study Master. We provide the tools and skills to teach what you love.</p>
                <Link to="/signup">
                            <button className='button1'>Start Learning Today<FaCircleArrowRight className='icon' /></button>
                        </Link>
            </div>
        </div>


    )
}


export default Becomeainstructor;
