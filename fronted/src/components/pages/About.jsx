import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import './About.css'
import LearningGrid from "../core/About/LearningGrid";
import Getintouch from "../core/About/Getintouch";

function About() {
    return (
        <div >
            {/* section   1 */}
            <section className="section1">
                <div className="top">
                    <h2>Driving Innovation in Online Education for a <span className="span">Brighter Future</span></h2>
                    <p>Study Master is at the forefront of driving innovation in online education. we're passionate about creating a brighter future by offering cutting-edge courses, loveraging technologies, and nurturing  a vibrant learning community. </p>
                </div>
                <div className="middleimg">
                    <img src="/about/4.jpeg" alt="" />
                    <img src="/about/3.jpeg" alt="" />
                    <img src="/about/2.webp" alt="" />

                </div>
                <div className="last">
                    <h2>We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise, and community to create an unparalleled educational experience.</h2>
                </div>

            </section>
            {/* section   2 */}
            <section className="section2">
                <div className="left">
                    <h2>Our Founding Story</h2>
                    <p>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologies and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential. 
                    </p>
                </div>
                <div className="right">
                <img src="/about/3.jpg" alt="" />
                </div>


            </section>
            {/* section 3 */}

            <section className="section3">
                        <div className="section3left">
                              <h2>
                                "Our Vision"
                              </h2>
                              <p>
                              With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines  cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                              </p>
                        </div>
                        <div className="section3right">
                            <h2>
                             "Our Mission"
                            </h2>
                            <p>
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities. 
                            </p>
                        </div>

            </section>

            {/* section 4 */}

            <section className="section4">
                 <div className="section4main">
                      <div className="one">
                        <p className="above">
                              3K
                        </p>
                        <p className="below">
                             Active Students
                        </p>
                      </div>
                      <div className="two">
                        <p className="above">
                              10+
                        </p>
                        <p className="below">
                             Mentors
                        </p>
                      </div>
                      <div className="three">
                        <p className="above">
                            100+
                        </p>
                        <p className="below">
                           Courses
                        </p>
                      </div>
                      <div className="four">
                        <p className="above">
                             20+
                        </p>
                        <p className="below">
                            Awards
                        </p>
                      </div>
                 </div>
            </section>

            {/* section 4 */}
            <section className="section4">
                <LearningGrid/>
                <Getintouch/>
                    
            </section> 

        </div>
    );
}

export default About;
