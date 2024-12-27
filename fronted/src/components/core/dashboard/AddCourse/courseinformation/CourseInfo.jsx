import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { FaIndianRupeeSign } from "react-icons/fa6";
import ChipInput from "./ChipInput";
import ImageUpload from "./ImageUpload"
import RequirementsField from "./RequirementsField";
import { setCourse, setStep } from "../../../../../slices/Courseslice";
import IconBtn from "../../../../../common/IconBtn";
import { editcourse } from "../../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../../utils/Constant";
import { addCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import "./CourseInfo.css"


export default function CourseInfo() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },

    } = useForm()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false)
    const [coursecategories, setcoursecategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                const categories = await fetchCourseCategories();
                console.log("Fetched Categories:", categories);
                if (categories && categories.length > 0) {
                    setcoursecategories(categories);
                } else {
                    setcoursecategories([]); // Fallback to an empty array if categories are undefined or null
                    toast.error("No categories found");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch course categories");
            } finally {
                setLoading(false);
            }
        }


        if (editCourse) {
            setValue("CourseTitle", course.coursename);
            setValue("courseShortDesc", course.coursedescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenifits", course.whatyouwilllearn);
            setValue("courseCatagory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    }, [editCourse, course, setValue]);


    const formUpdated = () => {
        const currentvalue = getValues();

        if (currentvalue.CourseTitle !== course.coursename ||
            currentvalue.courseShortDesc !== course.coursedescription ||
            currentvalue.coursePrice !== course.price ||
            currentvalue.courseTags.toString() !== course.tag.toString() ||
            currentvalue.courseBenifits !== course.whatyouwilllearn ||
            currentvalue.courseCatagory._id !== course.category._id ||
            currentvalue.courseRequirements.toString() !== course.instructions.toString() ||
            currentvalue.courseImage !== course.thumbnail
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    const Onsubmit = async (data) => {
        if (editCourse) {
            if (formUpdated()) {
                const currentvalue = getValues();
                const formdata = new FormData()
                formdata.append("courseId", course._id)

                if (currentvalue.CourseTitle !== course.coursename) {
                    formdata.append("coursename", data.CourseTitle)
                }
                if (currentvalue.courseShortDesc !== course.coursedescription) {
                    formdata.append("coursedescription", data.courseShortDesc)
                }
                if (currentvalue.coursePrice !== course.price) {
                    formdata.append("price", data.coursePrice)
                }
                if (currentvalue.courseTags.toString() !== course.tag.toString()) {
                    formdata.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentvalue.courseBenifits !== course.whatyouwilllearn) {
                    formdata.append("whatyouwilllearn", data.courseBenifits)
                }
                if (currentvalue.courseCatagory._id !== course.category._id) {
                    formdata.append("category", data.courseCatagory)
                }
                if (currentvalue.courseRequirements.toString() !== course.instructions.toString()) {
                    formdata.append("instructions", JSON.stringify(data.courseRequirements))
                }
                if (currentvalue.courseImage !== course.thumbnail) {
                    formdata.append("thumbnailimage", data.courseImage)
                }
                setLoading(true)
                const result = await editcourse(formdata, token)
                setLoading(false)
                if (result) {
                    setStep(2)
                    dispatch(setCourse(result))
                }

            }
            else {
                toast.error("No Changes made to the form")
            }
            return;
        }

        //create A new course

        const formdata = new FormData()
        formdata.append("coursename", data.CourseTitle);
        formdata.append("coursedescription", data.courseShortDesc);
        formdata.append("price", data.coursePrice);
        formdata.append("tag", data.courseTags);
        formdata.append("whatyouwilllearn", data.courseBenifits);
        formdata.append("category", data.courseCatagory);
        formdata.append("instructions", JSON.stringify(data.courseRequirements));
        formdata.append("thumbnail", data.courseImage);
        //  formdata.append("coursename", data.courseCatagory);
        formdata.append("status", COURSE_STATUS.DRAFT);

        setLoading(true);
        const result = await addCourseDetails(formdata, token)
        if (result) {
            setStep(2)
            dispatch(setCourse(result))
        }
        setLoading(false);
        console.log("printing data", formdata)
        console.log("printting result", result)

    }

    return (
        <div>
            <form
                action=""
                onSubmit={handleSubmit(Onsubmit)}
                className="ClassInfo_mainForm">
                <div className="Course_title_Section">
                    <label htmlFor="CourseTitle">Course Title <sup className="required_filed">*</sup></label>
                    <input type="text"
                        className="Course_title_input"
                        id="CourseTitle"
                        placeholder="Enter The Course Title"
                        {...register("CourseTitle", { required: true })}

                    />{
                        errors.CourseTitle && (<span>Course Title is Required**</span>)
                    }

                </div>
                <div className="Course_ShortDescription_Section">
                    <label htmlFor="courseShortDesc">Course Short Description <sup className="required_filed">*</sup></label>
                    <input type="text"
                        className="Course_ShortDescription_input"
                        id="courseShortDesc"
                        placeholder="Enter The Course Description"
                        {...register("courseShortDesc", { required: true })}

                    />{
                        errors.courseShortDesc && (<span>Course Description is Required**</span>)
                    }

                </div>
                <div className="Course_Price_Section">
                    <label htmlFor="coursePrice">Course Price <sup className="required_filed">*</sup></label>

                    <input
                        className="Course_title_input"
                        id="coursePrice"
                        placeholder="Enter The Course Price"
                        {...register("coursePrice",
                            {
                                required: true,
                                valueAsNumber: true
                            }

                        )}

                    />
                    <FaIndianRupeeSign className="ruppee_icon" />
                    {
                        errors.coursePrice && (<span>Course Price is Required**</span>)
                    }

                </div>

                <div className="Course_Category_Section">
                    <label htmlFor="courseCatagory">Course Category <sup className="required_filed">*</sup></label>

                    <select
                        id="courseCatagory"
                        {...register("courseCatagory", { required: true })}
                        defaultValue={course?.category?._id || ""}
                    >
                        <option value="" disabled>Choose a Category</option>
                        {
                            !loading && coursecategories.map((category, index) => (
                                <option key={index} value={category?._id}>
                                    {category?.name}
                                </option>
                            ))
                        }
                    </select>

                    {errors.courseCatagory && <span>Course Category is Required**</span>}
                </div>



                <ChipInput label="Tags" name="courseTags" placeholder="Enter Tags and press Enter" register={register} errors={errors} setValue={setValue} getValues={getValues} />

                <ImageUpload name="courseImage" label="Course Thumbnail" register={register} setValue={setValue} errors={errors} editData={editCourse ? course?.thumbnail : null} />

                <div className="Course_Benefits_Section">
                    <label htmlFor="courseBenifits">Course Benifits <sup className="required_filed">*</sup></label>
                    <input type="text"
                        className="Course_ShortDescription_input"
                        id="courseBenifits"
                        placeholder="Enter The Course Description"
                        {...register("courseBenifits", { required: true })}

                    />{
                        errors.courseBenifits && (<span>Course Benifits is Required**</span>)
                    }

                </div>
                <RequirementsField name="courseRequirements" label="Requirements/Instructions" register={register} setValue={setValue} errors={errors} getValues={getValues} />

                <div className="last_two_buttons">
                    {
                        editCourse && (
                            <button
                                className="Continue_button"
                                onClick={() => { dispatch(setStep(2)) }}
                            >

                                Continue Without saving
                            </button>

                        )

                    }
                    {/* <button>dsdsdsd</button> */}
                    <IconBtn text={!editCourse ? "Next" : "Save Changes"} />
                </div>
            </form>
        </div>
    );
}

