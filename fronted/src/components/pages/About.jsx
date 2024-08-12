import React from "react";
import { Link } from "react-router-dom"; 
import './About.css'
import LearningGrid from "../core/About/LearningGrid";
import Getintouch from "../core/About/Getintouch";
import Stats from "../core/About/Stats";
import Footer from "../../common/Footer";





function About() {
    return (
        <div >
            {/* section   1 */}
            <section className="aboutsection1">
                <div className="section1top">
                    <h2 className="section1toph2">Driving Innovation in Online Education for a <span className="span">Brighter Future</span></h2>
                    <p className="section1topp">Study Master is at the forefront of driving innovation in online education. we're passionate about creating a brighter future by offering cutting-edge courses, loveraging technologies, and nurturing  a vibrant learning community. </p>
                </div>
                <div className="section1middleimg">
                    <img src="/about/4.jpeg" alt="" />
                    <img src="/about/3.jpeg" alt="" />
                    <img src="/about/2.webp" alt="" />

                </div>
                <div className="section1last">
                    <h2 className="section1lasth2">We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise, and community to create an unparalleled educational experience.</h2>
                </div>

            </section>
            {/* section   2 */}
            <section className="aboutsection2">
                <div className="section2left">
                    <h2 className="section2lefth2">Our Founding Story</h2>
                    <p className="section2leftp">
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologies and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className="section2leftp"> 
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential. 
                    </p>
                </div>
                <div className="section2right">
                <img src="/about/3.jpg" alt="" />
                </div>


            </section>
            {/* section 3 */}

            <section className="aboutsection3">
                        <div className="section3left">
                              <h2 className="section3lefth2">
                                "Our Vision"
                              </h2>
                              <p className="section3leftp">
                              With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines  cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                              </p>
                        </div>
                        <div className="section3right">
                            <h2 className="section3righth2">
                             "Our Mission"
                            </h2>
                            <p className="section3rightp">
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities. 
                            </p>
                        </div>

            </section> 

            {/* section 4 */}
                 <div>
                    <Stats/>
                      
                 </div>
  

            {/* section 5 */}
            <section className="aboutsection5">
                <LearningGrid/>
                <Getintouch/>
                  
            </section>  

            {/* footer */}

           <div>
            <Footer/>
           </div>

        </div>
    );
}

export default About;
