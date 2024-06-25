import React from 'react'
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from 'react-icons/fa6';
import './Codeblock.css';

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
                    <p className="code-snippet">{`
                             1. <!doctype html>
                             2. <html lang="en">
                             3. <head>
                             4. <meta charset="UTF-8" />
                             5. <meta name="viewport" content="width" />
                             6. <title>Vite + React</title>
                             7. </head>
                             8. <body>
                             9. </body>
                             10. </html>
                    `}</p>
                </div>
            </div>

            <div className='codeblock1'>
                <div className='codeblock1right'>
        
                                  <p className="code-snippet">{`
                             1. <!doctype html>
                             2. <html lang="en">
                             3. <head>
                             4. <meta charset="UTF-8" />
                             5. <meta name="viewport" content="width" />
                             6. <title>Vite + React</title>
                             7. </head>
                             8. <body>
                             9. </body>
                             10. </html>
                    `}</p>
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
