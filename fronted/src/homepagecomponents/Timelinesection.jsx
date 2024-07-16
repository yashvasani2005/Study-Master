
import React from "react"
import './Timelinesection.css';

function Timelinesection(){
    return (

        <div>
<section className="resume" id="resume">
  <div className="container">
    <div className="row">

      <div className="col-lg-6 col-12">
        {/* <h2 className="mb-4">Skills</h2> */}

        <div className="timeline">
          <div className="timeline-wrapper">
            <div className="timeline-yr">
              <img src="./Timeline/leader.png"></img>
            </div>
            <div className="timeline-info">
              <h3><span>Leadership</span></h3>
              <p>Fully committed to the success company</p>
            </div>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-yr">
            <img src="./Timeline/responsibility.png"></img>
            </div>
            <div className="timeline-info">
              <h3><span>Responsibility</span></h3>
              <p> Student will always be our top priority</p>
            </div>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-yr">
            <img src="./Timeline/flexible.png"></img>
            </div>
            <div className="timeline-info">
              <h3><span>Flexibility</span></h3>
              <p>The ability to switch is an important skills</p>
            </div>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-yr">
            <img src="./Timeline/solve.png"></img>
            </div>
            <div className="timeline-info">
              <h3><span>Solve the problem</span></h3>
              <p>Code your way to a solution</p>
            </div>
          </div>

        </div>
      </div>

      <div className="col-lg-6 col-12">
        {/* <h2 className="mb-4 mobile-mt-2">Educations</h2> */}

        <div className="timeline">
            <div className="timeline-info">
                 <img src="/Timeline/rightsideimage.png" alt="" />

                 <div className="details">
                             <div className="left">
                                  <p className="special">10</p>
                                  <p className="notspecial"> Years of Experience</p>


                             </div>
                             <div className="right">
                              <p className="special">250</p>
                              <p className="notspecial">Type of Courses</p>

                             </div>
                    
                 </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</section>
        </div>
    )
}


export default Timelinesection;
