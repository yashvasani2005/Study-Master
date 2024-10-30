import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
// import IconBtn from "../../common/IconBtn";
import IconBtn from "../../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";
import "./MyCourse.css"; // Import the external CSS file

export default function MyCourse() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) setCourses(result);
    };
    fetchCourses();
  }, [token]);

  return (
    <div className="myCoursesContainer">
      <div className="myCoursesHeader">
        <h1 className="myCoursesTitle">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
}

