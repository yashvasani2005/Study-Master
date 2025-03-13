import { useState } from "react";
import "./CourseBuilderForm.css"
import { useForm } from "react-hook-form";
import IconBtn from "../../../../../common/IconBtn";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/Courseslice";
import toast from "react-hot-toast";
import { updateSection } from "../../../../../services/operations/courseDetailsAPI";
import { createSection } from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";



export default function CourseBuilderForm() {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionname, SeteditSectionname] = useState(null)
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, Setloading] = useState(false)
  const dispatch = useDispatch();


const onSubmit = async (data) => {
    if (!token) {
        toast.error("Unauthorized! Please log in again.");
        return;
    }

    Setloading(true);
    let result;

    if (editSectionname) {
        result = await updateSection({
            sectionName: data.sectionname,
            sectionid: editSectionname,
            courseId: course._id,
        }, token);
        console.log("Updating Section with Data:", result);
    } else {
        result = await createSection({
            sectionName: data.sectionname,
            courseId: course._id,
        }, token);
    }

    console.log("API Response:", result);

    if (result) {
        dispatch(setCourse(result));
        SeteditSectionname(null);
        setValue("sectionname", "");
    }

    Setloading(false);
};
// const onSubmit = async (data) => {
//   Setloading(true);
//   let result;

//   if (editSectionname) {
//     //we are editing the section name
//     result = await updateSection({
//       sectionName: data.sectionName,
//       sectionid: data.editSectionname,
//       courseId: course._id,

//     }, token

//     )
//   }
//   else {

//     result = await createSection(
//       {
//         sectionName: data.sectionname,
//         courseId: course._id,
   
 
//       }, token
      
//     )
// console.log("your result is here",result)

//   }
 
//   //update the value

//   if (result) {
//     dispatch(setCourse(result));
//     SeteditSectionname(null);
//     setValue("sectionname", "");
//   }
//   console.log("your result is here",result)

//   //loading false

//   Setloading(false)

// }
  const cancelEdit = () => {
    SeteditSectionname(null);
    setValue("sectionname", "");
  }
  const GoBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))

  }
  const GotoNext = () => {
    if (course?.coursecontent?.length === 0) {
      toast.error("Please Add Atleast One Section")
      return;
    }

    if (course.coursecontent.some((section) => section.subsection.length === 0)) {
      toast.error("Please Add Atleast One Lecture in each Section")
      return;
    }


    dispatch(setStep(3))

  }


  // const handleChangeEditSectionName=(sectionId, SectionName)=>{
  //   if(editSectionname===sectionId){
  //     cancelEdit();
  //     return;
  //   }

  //   SeteditSectionname(sectionId)
  //   setValue("sectionname",SectionName);
  // }
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionname === sectionId) {
        cancelEdit();
        return;
    }
    SeteditSectionname(sectionId);
    setValue("sectionname", sectionName);  // ✅ Fixed field name
};

  return (
    <div className="Main_body_of_courseBuilder">
      <h1>Course Bulider</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>

        <div className="mainsection">
          <label htmlFor="sectionname" className="label">Section Name <sup>*</sup></label>
          <input type="text" className="inputtagdorsection"
            id="sectionname"
            placeholder="Enter the Section Name"
            {...register("sectionname", { required: true })}


          />
          {errors.sectionname && (
            <span>Section name is required</span>
          )}
        </div>
        <div className="coursebuilderButtons">
          <IconBtn
            type="Submit"
            text={editSectionname ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoMdAddCircleOutline />
          </IconBtn>
          {
            editSectionname && (
              <button
                className="CancelEdit"
                onClick={cancelEdit}>
                Cancel Edit
              </button>
            )
          }

        </div>

      </form>

      {
        course?.coursecontent?.length > 0 && (
          <NestedView  handleChangeEditSectionName={handleChangeEditSectionName } />
        )
      }

      <div className="BackandNextButton">
        <button
          onClick={GoBack}>
          Back
        </button>
        <IconBtn
          text="Next"
          onclick={GotoNext}
        >
          <FaArrowRight />

        </IconBtn>

      </div>

    </div>
  );
}
