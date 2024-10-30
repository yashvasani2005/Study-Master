import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../../services/formatDate";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../utils/Constant";

import Confirmationmodal from "../../../../common/Confirmationmodal";
import "./CoursesTable.css"; // Import external CSS

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 30;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <>
      <Table className="coursesTable">
        <Thead>
          <Tr className="coursesTableHeaderRow">
            <Th className="coursesTableHeaderCell">Courses</Th>
            <Th className="coursesTableHeaderCell">Duration</Th>
            <Th className="coursesTableHeaderCell">Price</Th>
            <Th className="coursesTableHeaderCell">Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="noCoursesMessage">No courses found</Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr key={course._id} className="courseRow">
                <Td className="courseInfo">
                  <img src={course?.thumbnail} alt={course?.courseName} className="courseThumbnail" />
                  <div className="courseDetails">
                    <p className="courseName">{course.courseName}</p>
                    <p className="courseDescription">
                      {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                        ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="courseDate">Created: {formatDate(course.createdAt)}</p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="courseStatusDraft">
                        <HiClock size={14} /> Drafted
                      </p>
                    ) : (
                      <div className="courseStatusPublished">
                        <div className="statusIcon">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </div>
                    )}
                  </div>
                </Td>
                <Td className="courseDuration">2hr 30min</Td>
                <Td className="coursePrice">₹{course.price}</Td>
                <Td className="courseActions">
                  <button
                    disabled={loading}
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    title="Edit"
                    className="editButton"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    title="Delete"
                    className="deleteButton"
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2: "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...",
                        btn2Text: "Cancel",
                        btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                      });
                    }}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModal && <Confirmationmodal modalData={confirmationModal} />}
    </>
  );
}
