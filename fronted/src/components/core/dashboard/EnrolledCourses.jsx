import { useSelector } from 'react-redux';
import './EnrolledCourses.css';
import { useEffect, useState } from 'react';
import { getUserEnrolledCourses } from '../../../services/operations/ProfileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import Spinner from '../../../common/Spinner';

function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth)
    const [enrolledCourses, setenrolledcourses] = useState(null)

    const getenrolledcourse = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setenrolledcourses(response)

        }
        catch (err) {
            console.log(err)
            console.log("Error in Enrolledcourses.jsx ")
        }
    }

    useEffect(() => {
        getenrolledcourse();
    }, [])
    return (
        <div>
            <h2 className='Enrolledcourses_heading'>Enrolled Courses</h2>

            {
                !enrolledCourses
                    ? (<Spinner />)
                    : !enrolledCourses.length ? (<p className='EnrollrdCourse_nocourses_pragraph'>You have not enrolled in any courses yet</p>)
                        : (
                           
                            <div className="EnrolledCourses_section">
                                 <p>dwdeferfererrererer</p>
                                <div className="Enrolledcourses_titlesection">
                                    <p>Course Name</p>
                                    <p>Duration</p>
                                    <p>Progress</p>
                                </div>
                                <div className="enrolledcourses_cardsection">
                                    {
                                        enrolledCourses.map((course, index) => (
                                            <div className="enrolledCourses_allcard">
                                                <div className='enrolledcourses_section_cardName'>
                                                    <div className='enrolledcourses_section_cardName_left'>
                                                        <img src={course.thumbnail} alt="course_thumbnail" />
                                                    </div>
                                                    <div className="enrolledcourses_section_cardName_right">
                                                        <p>{course.coursename}</p>
                                                        <p>{course.coursedescription}</p>
                                                    </div>

                                                </div>
                                                <div className="enrolledcourses_section_Duration">
                                                    {course?.totalduration}
                                                </div>
                                                <div className="enrolledcourses_section_Progress">
                                                    <p>Progress: {course.progresspercentage || 0}%</p>
                                                    <ProgressBar
                                                        completed={course.progresspercentage || 0}
                                                        isLabelVisible={false}
                                                    />
                                                </div>


                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        )

            }
        </div>
    );
}

export default EnrolledCourses;
