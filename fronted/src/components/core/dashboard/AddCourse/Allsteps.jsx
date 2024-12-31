import { useSelector } from "react-redux";
import { BiCheck } from "react-icons/bi";
import CourseInfo from "./courseinformation/CourseInfo";
import CourseBuilder from "./courseBuilder/CourseBuilder";
import "./Allsteps.css";

export default function Allsteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: "1",
      title: "Upload Course Information",
    },
    {
      id: "2",
      title: "Build The Course",
    },
    {
      id: "3",
      title: "Create The Course",
    },
  ];

  return (
    <div className="allsteps_container">
      <div className="steps_list">
        {steps.map((item) => (
          <div
            key={item.id}
            className={`step_item ${
              step >= item.id ? "bg-color-yellow" : "bg-richblack-500"
            }`}
          >
            {step > item.id ? <BiCheck /> : item.id}
            <span className="deshing">-------------</span>
            <div className="item_title">{item.title}</div>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInfo />}
      {step === 2 && <CourseBuilder />}
    </div>
  );
}
