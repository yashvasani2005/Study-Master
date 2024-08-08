 import { Link } from "react-router-dom";
import "./LearningGrid.css"; 
const data=[
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:  "StudyMaster partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
      },
      {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",   
      },
      {
        order: 2,
        heading: "Our Learning Methods",
        description: "StudyMaster partners with more than 275+ leading universities and companies to bring",   
      },
      {
        order: 3,
        heading: "Certification",
        description:  "StudyMaster partners with more than 275+ leading universities and companies to bring",  
      },
      {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description: "StudyMaster partners with more than 275+ leading universities and companies to bring",     
      },
      {
        order: 5,
        heading: "Ready to Work",
        description:  "StudyMaster partners with more than 275+ leading universities and companies to bring",
      },

]

export default function LearningGrid(){

  return (


   <div className="learninggridmain">
                 {
                    
                         data.map((card,index)=>{
                            return(
                             
                                  (card.order<0)?
                                  
                                   (
                                    <div className="leftside">
                                        <h2>{card.heading}</h2><span>{card.highlightText}</span>
                                        <p>{card.description}</p>
                                      <Link to={`${card.BtnLink}`}>
                                      <button className="learninggridbutton">
                                        {card.BtnText}
                                      </button>
                                      </Link>
                                  </div>
                                   )

                                  :
                                (
                                  <div className="rightside">
                                      <h3>{card.heading}</h3>
                                      <p>{card.description}</p>
                                  </div>
                                )
                           
                            )
                             
                         })
                 }
   </div>
  
)}