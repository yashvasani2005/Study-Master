
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RxDropdownMenu } from "react-icons/rx";

import "./NestedView.css"
import { useState } from "react";

export default function NestedView() {
  const{course}=useSelector((state)=>state.course);
  const{token }=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  const[addSubSection,setaddSubSection]=useState(null);
  const[editSubSecrion,seteditSubSection]=useState(null);
  const[viewSubSection,setviewSubSection]=useState(null);

  const[Confirmationmodal,setconfirmationmodal]=useState(null);

    // console.log("is there any course content",course?.coursecontent  )

    useEffect(() => {
      console.log("Updated sections in NestedView:", course.coursecontent);
    }, [course.coursecontent]);

  return (
  
   <div className="mainbodyOFNestedView">
        <h2>fdfdfdfdff</h2>

        <div className="WholeNestedSection">
          {
            course?.coursecontent?.map((section)=>(
              <details key={section._id} open>
                <summary>
                    <div className="firstSectionOfsection">
                    <RxDropdownMenu />
                    <p className="Sectionname">{section.sectionName}</p>


                    </div>
                   
                </summary>


              </details>
            ))
          }
           
        </div>

   </div>
  );
}

