import React from 'react'
import { Link } from 'react-router-dom'
import { FaCircleArrowRight } from "react-icons/fa6";
import "./Home.css"
// import Baner from "../fronted/src/assets/Baner.mp4"
import Baner2 from "../.././assets/Baner2_2.mp4"
import Codeblocks from '../../homepagecomponents/Codeblocks';
import Timelinesection from '../../homepagecomponents/Timelinesection';
import Learninglanguagesection from '../../homepagecomponents/Learninglanguagesection';
import Becomeainstructor from '../../homepagecomponents/Becomeainstructor';
import Exploremore from '../../homepagecomponents/Exploremore';


function Home() {


  return (
    <div>

      {/* SECTION :::--->>>1 */}
      <div className='section-1'>

        <div className='linkofinstructor'>
          <Link to={"/signup"}>
            <div className='outer'>
              <div className='inner'>
                <div>Become a Instructor</div>
                <FaCircleArrowRight />
              </div>
            </div>
          </Link>
        </div>


        <div className="section1description">
          <h2>Empower Your Future With <span className='headingspan'>Coding Skills</span></h2>
          <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizes and personalized feedback from the instructor</p>
        </div>

        <div className="section1buttons">
          <Link to={"/signup"}>
            <button className='learnmore'>Learn More</button>
          </Link>

          <Link to={"/login"}>
            <button className='bookademo'>Book a Demo</button>
          </Link>


        </div>

        <div className="videosection">
          <video
            muted
            loop
            autoPlay>
            <source src={Baner2} type='video/mp4' />
          </video>

        </div>

        <div>
          <Codeblocks />

        </div>

          <Exploremore/>
          
      </div>

      {/* SECTION :::--->>>2 */}
      <div className="section2">
        <div className="section2buttons">
          <Link to={"/signup"}>
            <button className='explorefull'>Explore full Catalog    <FaCircleArrowRight /></button>
          </Link>

          <Link to={"/login"}>
            <button className='section2learnmore'>Learn more</button>
          </Link>

        </div>
        <div className="skill">
          <div className="left">
            <h2>Get the skills you need for a <span>Job that is in demand</span></h2>

          </div>
          <div className="right">
            <p>the modern "Study Matser" is the dictates its own terms. Today, to be a compititive specialist requires more than Professional skills</p>
            <br />
            <Link to={"/signup"}>
              <button className='skillbutton'>Learn More</button>
            </Link>

          </div>


        </div>

        <div className="timelinesection">
                       <Timelinesection/>
                       <Learninglanguagesection/>
        </div>

      </div>

      {/* SECTION :::--->>>3 */}
      <div className="section3">
          <Becomeainstructor/>
      </div>

      {/* FOOTERBABA */}

      <div className="footer">
        <div className="footersec1">
          <div className="line1">
            <img src="Preview.png" alt="Company Logo" className='logo' />
            <h3>Company</h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
            <div className="alllogo">
              <img src="/alllogo/yt.png" alt="YouTube" className="youtube" />
              <img src="/alllogo/google.jpeg" alt="Google" className="google" />
              <img src="/alllogo/Twitter.png" alt="Twitter" className="twitter" />
              <img src="/alllogo/facebook.png" alt="Facebook" className="facebook" />
            </div>
          </div>
          <div className="line2">
            <div className="first">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Articles</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Chart Sheet</a></li>
                <li><a href="#">Code Challenges</a></li>
                <li><a href="#">Docs</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Video</a></li>
                <li><a href="#">Workspaces</a></li>
              </ul>
            </div>
            <div className="second">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div className="line3">
            <div className="first">
              <h3>Plans</h3>
              <ul>
                <li><a href="#">Paid Memberships</a></li>
                <li><a href="#">For Students</a></li>
                <li><a href="#">Business Solutions</a></li>
              </ul>
            </div>
            <div className="second">
              <h3>Community</h3>
              <ul>
                <li><a href="#">Forums</a></li>
                <li><a href="#">Chapters</a></li>
                <li><a href="#">Events</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footersec2">
          <div className="line1">
            <h3>Subjects</h3>
            <ul>
              <li><a href="#">AI</a></li>
              <li><a href="#">Cloud Computing</a></li>
              <li><a href="#">Code Foundations</a></li>
              <li><a href="#">Computer Science</a></li>
              <li><a href="#">Cybersecurity</a></li>
              <li><a href="#">Data Analytics</a></li>
              <li><a href="#">Data Science</a></li>
              <li><a href="#">Data Visualizations</a></li>
              <li><a href="#">Developer Tools</a></li>
              <li><a href="#">DevOps</a></li>
              <li><a href="#">Game Development</a></li>
              <li><a href="#">IT</a></li>
              <li><a href="#">Machine Learning</a></li>
              <li><a href="#">Math</a></li>
              <li><a href="#">Mobile Development</a></li>
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Web Development</a></li>
            </ul>
          </div>
          <div className="line2">
            <h3>Languages</h3>
            <ul>
              <li><a href="#">Bash</a></li>
              <li><a href="#">C</a></li>
              <li><a href="#">C++</a></li>
              <li><a href="#">C#</a></li>
              <li><a href="#">Go</a></li>
              <li><a href="#">HTML & CSS</a></li>
              <li><a href="#">Java</a></li>
              <li><a href="#">JavaScript</a></li>
              <li><a href="#">Kotlin</a></li>
              <li><a href="#">PHP</a></li>
              <li><a href="#">Python</a></li>
              <li><a href="#">R</a></li>
              <li><a href="#">Ruby</a></li>
              <li><a href="#">SQL</a></li>
              <li><a href="#">Swift</a></li>
            </ul>
          </div>
          <div className="line3">
            <h3>Career Building</h3>
            <ul>
              <li><a href="#">Career Paths</a></li>
              <li><a href="#">Career Services</a></li>
              <li><a href="#">Interview Prep</a></li>
              <li><a href="#">Professional Certifications</a></li>
              <li><a href="#">----</a></li>
              <li><a href="#">Full Catalog</a></li>
              <li><a href="#">Beta Content</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="finalfooter">
        <p>&copy;2024 Made With  <img src="/alllogo/heart.png"></img>  Study Master | All Rights Reserved</p>

      </div>


    </div>
  )
}

export default Home
