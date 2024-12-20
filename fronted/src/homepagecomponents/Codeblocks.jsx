import React from 'react'
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from 'react-icons/fa6';
import './Codeblock.css';
import coding1 from "../../public/coding/coding1.webp"
import coding2 from "../../public/coding/coding2.webp"

function Codeblocks() {
    return (
        <div>
            <div className='codeblock1'>
                <div className='codeblock1left'>
                    <h3>Unlock your <span className='span'>coding potential</span> with our online courses</h3>
                    <p>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>
                    <div className="buttons">
                        <Link to="/signup">
                            <button className='button1'>Try it Yourself<FaCircleArrowRight className='icon' /></button>
                        </Link>
                        <Link to="/login">
                            <button className='button2'>Learn More</button>
                        </Link>
                    </div>
                </div>
                <div className='codeblock1right'>
                     <p className="code-snippet">
                        <img src={coding1} alt="" />
                    </p> 
                
                </div>
            </div>

            <div className='codeblock1'>
                <div className='codeblock1right'>

                    <p className="code-snippet">
                          <img src={coding2} alt="" />
                    </p>
                </div>

                <div className='codeblock1left'>
                    <h3>Start the <span className='span'>coding in seconds</span> </h3>
                    <p>Go ahead, give it a try. Our hands-on learning environment means you will be writing real code from your very first lesson.</p>
                    <div className="buttons">
                        <Link to="/signup">
                            <button className='button1'>Continue Lesson<FaCircleArrowRight className='icon' /></button>
                        </Link>
                        <Link to="/login">
                            <button className='button2'>Learn More</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Codeblocks;
