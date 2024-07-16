import React, { useState } from "react";
import { Homepageexplore } from "../data/Homepageexplore";
import './Exploremore.css';

const tabname = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];

function Exploremore() {
    const [currenttab, setcurrenttab] = useState(tabname[0]);
    const [courses, setcourses] = useState(Homepageexplore[0].courses);
    const [currentcard, setcurrentcard] = useState(Homepageexplore[0].courses[0].heading);

    const Setmycard = (value) => {
        setcurrenttab(value);
        const result = Homepageexplore.filter((course) => course.tag === value);
        setcourses(result[0].courses);
        setcurrentcard(result[0].courses[0].heading);
    };

    const handleCardClick = (heading) => {
        setcurrentcard(heading);
    };

    return (
        <div>
            <div className="heading">
                <h2>Unlock the <span className="spantag">Power of Code</span></h2>
            </div>
            <div className="paragraph">
                <p>Learn to build anything you can imagine</p>
            </div>
            <div className="navbar">
                {tabname.map((element, index) => (
                    <div
                        className={currenttab === element ? "bg-black-900 text-white font-medium" : "text-grey"}
                        key={index}
                        onClick={() => Setmycard(element)}
                    >
                        {element}
                    </div>
                ))}
            </div>
            <div className="courses">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className={
                            currentcard === course.heading
                                ? "course-card bg-black-900 text-white font-medium"
                                : "course-card bg-grey text-white"
                        }
                        onClick={() => handleCardClick(course.heading)}
                    >
                        <h3>{course.heading}</h3>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Exploremore;
