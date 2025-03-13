
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
// import Confirmationmodal from "../../../../../common/Confirmationmodal";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import SubSectionModal from "./SubSectionModal";
// import ConffimationModal from "../../../../../common/Confirmationmodal"
import Confirmationmodal from "../../../../../common/Confirmationmodal";


import "./NestedView.css"
import { useState } from "react";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/Courseslice";

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setaddSubSection] = useState(null);
  const [editSubSection, seteditSubSection] = useState(null);
  const [viewSubSection, setviewSubSection] = useState(null);

  const [Confirmationmooodal, setconfirmationmodal] = useState(null);

  // console.log("is there any course content",course?.coursecontent  )

  useEffect(() => {
    console.log("Updated sections in NestedView:", course.coursecontent);
  }, [course.coursecontent]);

  const handeletethedeleteSection = async (sectionid) => {
    const result = await deleteSection({

      sectionid,
      courseid: course._id,
      token
    })

    if (result) {
      dispatch(setCourse(result))
      // const updatedcourseContent = course.coursecontent.map((section) => section._id === sectionID ? result : section)
      // const Updatedcourse = { ...course, coursecontent: updatedcourseContent }
      // //extra soch na
      // dispatch(setCourse(Updatedcourse));

    }
    setconfirmationmodal(null);

  }
  const handeletethedeleteSubSection = async (subSectionID, sectionID) => {
    const result = await deleteSubSection({
      subSectionID,
      sectionID,
      token
    })
    if (result) {
      const updatedcourseContent = course.coursecontent.map((section) => section._id === sectionID ? result : section)
      const Updatedcourse = { ...course, coursecontent: updatedcourseContent }
      //extra soch na
      dispatch(setCourse(Updatedcourse));
    }
    setconfirmationmodal(null);
  }
  return (

    <div className="mainbodyOFNestedView">


      <div className="WholeNestedSection">
        {
          course?.coursecontent?.map((section) => (
            <details key={section._id} open>
              <summary>
                <div className="firstSectionOfsection">
                  <RxDropdownMenu />
                  <p className="Sectionname">{section.sectionName}</p>
                </div>
                <div className="EditDeleteDropdownButton">
                  <button className="sectionEditbutton"
                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                  >
                    <RiEdit2Fill />
                  </button>

                  <button className="sectionDeletebutton" onClick={() => {
                    setconfirmationmodal({
                      text1: "Delete This Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handeletethedeleteSection(section._id),
                      btn2Handler: () => setconfirmationmodal(null)
                    })
                  }}>
                    <AiFillDelete />

                  </button>
                  <span className="pipeline">|</span>
                  <IoIosArrowDropdownCircle />


                </div>


              </summary>

              <div className="MainBodyOfSubsection">
                {
                  section?.subsection?.map((data) => (
                    <div className="viewsubsectiondata"
                      key={data._id}
                      onClick={() => setviewSubSection(data)}
                    >
                      <div className="firstSectionOfSUBsection">
                        <RxDropdownMenu />
                        <p className="SubSectionname">{data.title}</p>
                      </div>
                      <div className="SubsectionButtons">
                        <button className="subsectionEdit">
                          <RiEdit2Fill
                            onClick={() => seteditSubSection({ ...data, sectionID: section.Id })} />
                        </button>
                        <button className="subsectionDelete" onClick={() => {
                          setconfirmationmodal({
                            text1: "Delete This SubSection",
                            text2: "Selected Lectures will be deleted",
                            btn1text: "Delete",
                            btn2text: "Cancel",
                            btn1Handler: () => handeletethedeleteSubSection(data._id, section._id),
                            btn2Handler: () => setconfirmationmodal(null)
                          })
                        }}>
                          <AiFillDelete />

                        </button>
                      </div>

                    </div>
                  ))
                }

                <button className="addlectureButtton"
                  onClick={() => setaddSubSection(section._id)}>
                  + Add-Lecture
                </button>
              </div>


            </details>
          ))
        }

      </div>
      {
        addSubSection ? (<SubSectionModal
          modalData={addSubSection}
          setmodalaData={setaddSubSection}
          add={true}
        />)
          : viewSubSection ? (<SubSectionModal
            modalData={viewSubSection}
            setmodalaData={setviewSubSection}
            view={true} />)
            : editSubSection ? (<SubSectionModal
              modalData={editSubSection}
              setmodalaData={seteditSubSection}
              edit={true} />)
              : (<div> </div>)

      }

      {
        Confirmationmooodal ?
          (
            <Confirmationmodal modalData={Confirmationmooodal} />
          )

          : (<div></div>)
      }

    </div>
  );
}

