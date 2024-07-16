
import React from "react"
import { Link } from 'react-router-dom'
import './Learninglanguagesection.css'

function Learninglanguagesection() {
    return (
        <div>

            <div className="heading">
                <h2>Your swiss knife for <span className='headingspan'>learning any Language</span></h2>
                <p>Using spin making learning multiple Languages easy. with 20+ Languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>

            <div className="imgsection">
                <img src="./Timeline/Know_your_progress.png" alt="Know your progress" />
                <img src="./Timeline/Compare_with_others.png" alt="Compare with others" />
                <img src="./Timeline/Plan_your_lessons.png" alt="Plan your lessons" />
            </div>

            <div className="button">
                <Link to={"/signup"}>
                    <button className='button1' >Learn More</button>
                </Link>
            </div>

        </div>

    )
}


export default Learninglanguagesection;
