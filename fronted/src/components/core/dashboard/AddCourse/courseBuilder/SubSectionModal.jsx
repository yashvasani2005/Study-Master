
// import { useForm } from "react-hook-form";
// import "./SubSectionModal.css";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { createSubSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
// import { setCourse } from "../../../../../slices/Courseslice";
// import { RxCross1 } from "react-icons/rx";
// import Upload from "../courseinformation/ImageUpload";
// import IconBtn from "../../../../../common/IconBtn";
// import { useSelector } from "react-redux";

// export default function SubSectionModal(
//     {
//         modalData,
//         setmodalaData,
//         add = false,
//         view = false,
//         edit = false,
//     }
// ) {

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//         getValues,


//     } = useForm();

//     const dispatch = useDispatch();
//     const [loading, setloading] = useState(false);
//     const { course } = useSelector((state) => state.course);
//     const { token } = useSelector((state) => state.auth);

//     useEffect(() => {
//         if (view || edit) {
//             setValue("LectureTitle", modalData.title)
//             setValue("LectureDesc", modalData.description)
//             setValue("Lecturevideo", modalData.videoUrl)
//         }
//     }, [])

//     const isFormUpdated = () => {
//         const currentValue = getValues();
//         if (currentValue.LectureTitle !== modalData.title

//             || currentValue.LectureDesc !== modalData.description

//             || currentValue.Lecturevideo !== modalData.videoUrl
//         ) {
//             return true;
//         }
//         else {
//             return false;
//         }

//     }
//     const handleEditSubSection = async () => {

//         const currentValue = getValues();
//         const formdata = new FormData();

//         formdata.append("sectionId", modalData.sectionId)
//         formdata.append("subSectionId", modalData._id)

//         if (currentValue.LectureTitle !== modalData.title) {
//             formdata.append("title", currentValue.LectureTitle)
//         }
//         if (currentValue.LectureDesc !== modalData.description) {
//             formdata.append("description", currentValue.LectureDesc)
//         }
//         if (currentValue.Lecturevideo !== modalData.videoUrl) {
//             formdata.append("video", currentValue.Lecturevideo)
//         }
//         setloading(true)

//         //API Call

//         const result = updateSection(formdata, token)
//         if (result) {

//             const updatedcourseContent = course.coursecontent.map((section) => section._id === modalData.sectionId ? result : section)
//             const Updatedcourse = { ...course, coursecontent: updatedcourseContent }
//             //extra soch na
//             dispatch(setCourse(Updatedcourse));
//         }

//         setmodalaData(null);
//         setloading(false);

//     }
//     const Onsubmit = async (data) => {
//         if (view)
//             return;

//         if (edit) {
//             if (!isFormUpdated()) {
//                 toast.error("No changes made to the Form")
//             }
//             else {
//                 //edit karo

//                 handleEditSubSection();
//             }
//             return;
//         }


//         //ADD
//         const formdata = new FormData();
//         formdata.append("sectionId", modalData.sectionId)
//         formdata.append("title", data.LectureTitle)
//         formdata.append("description", data.LectureDesc)
//         const videoFile = data.LectureVideo[0];
//         if (!videoFile) {
//             toast.error("Video file is required");
//             return;
//         }
//           formdata.append("video", videoFile);
//         setloading(true);

//         //API call
//         const result = await createSubSection(formdata, token)


//         if (result) {
//             //TODO: 
//             const updatedcourseContent = course.coursecontent.map((section) => section._id === modalData ? result : section)
//             const Updatedcourse = { ...course, coursecontent: updatedcourseContent }
//             //extra soch na
//             dispatch(setCourse(Updatedcourse));
//             // distpatch(setCourse(result)) 
//         }
//         setmodalaData(null)
//         setloading(false);



//     }

//     return (

//         <div>

//             <div className="mainBodyofSubSectionModal">
//                 <div className="topheading">
//                     <p className="Modalheading">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
//                     <button className="crossbutton"
//                         onClick={() => (
//                             !loading ? setmodalaData(null) : {}
//                         )}
//                     >
//                         <RxCross1 />

//                     </button>
//                 </div>

//                 <div className="nextBody">
//                 <form onSubmit={handleSubmit(Onsubmit)} encType="multipart/form-data">

//                         <Upload
//                             name="LectureVideo"
//                             label="Lecture Video"
//                             register={register}
//                             setValue={setValue}
//                             errors={errors}
//                             video={true}
//                             viewData={view ? modalData.videoUrl : null}
//                             editData={edit ? modalData.videoUrl : null}
//                         />
//                         <div className="lectureTitle">
//                             <label htmlFor=""> Lecture Title</label>
//                             <input type="text"
//                                 id="LectureTitle"
//                                 placeholder="Enter Lecture Title"
//                                 {...register("LectureTitle", { required: true })}
//                             />
//                             {errors.LectureTitle && (<span>Lecture Tile is required</span>)}
//                         </div>
//                         <div className="lecturedescription">
//                             <label htmlFor=""> Lecture Description</label>
//                             <textarea name="" id="LectureDesc"
//                                 placeholder="Enter Lecture Description"
//                                 {...register("LectureDesc", { required: true })}

//                             ></textarea>
//                             {errors.LectureDesc && (<span>Lecture Description is required</span>)}
//                         </div>
//                         <div className="allbuttonofModal">
//                             {
//                                 !view && (
//                                     <IconBtn
//                                         text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
//                                     />
//                                 )
//                             }
//                         </div>


//                     </form>
//                 </div>


//             </div>

//         </div>
//     );
// }
import { useForm } from "react-hook-form";
import "./SubSectionModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/Courseslice";
import { RxCross1 } from "react-icons/rx";
 import Upload from "../courseinformation/ImageUpload";
import IconBtn from "../../../../../common/IconBtn";


export default function SubSectionModal({
    modalData,
    setmodalaData,
    add = false,
    view = false,
    edit = false,
}) {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("LectureTitle", modalData.title);
            setValue("LectureDesc", modalData.description);
            setValue("LectureVideo", modalData.videourl);
        }
    }, []);

    const isFormUpdated = () => {
        const currentValue = getValues();
        if (
            currentValue.LectureTitle !== modalData.title ||
            currentValue.LectureDesc !== modalData.description ||
            currentValue.LectureVideo !== modalData.videourl
        )
        {
            return true;
        }
        return false;
    };

    const handleEditSubSection = async () => {
        const currentValue = getValues();
        const formData = new FormData();
        console.log("modal data:::::", modalData);

        formData.append("sectionId", modalData.sectionID);
        formData.append("subSectionId", modalData._id);

        if (currentValue.LectureTitle !== modalData.title) {
            formData.append("title", currentValue.LectureTitle);
        }
        if (currentValue.LectureDesc !== modalData.description) {
            formData.append("description", currentValue.LectureDesc);
        }
        if (currentValue.LectureVideo !== modalData.videourl) {
            formData.append("video", currentValue.LectureVideo);
        }

        setLoading(true);

        const result = await updateSubSection(formData, token);

        if (result) {
            const updatedCourseContent = course.coursecontent.map((section) =>
                section._id === modalData.sectionID ? result : section
            );
            const updatedCourse = { ...course, coursecontent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }

        setmodalaData(null);
        setLoading(false);
    };

    const onSubmit = async (data) => {
        if (view) return;

        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the Form");
            } else {
                handleEditSubSection();
            }
            return;
        }

        // ADD New Subsection
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.LectureTitle);
        formData.append("description", data.LectureDesc);
        // formData.append("video", data.LectureVideo)

        // Debugging: Check if the file is correctly selected
        console.log("Form Data:", data);
        console.log("LectureVideo:", data.LectureVideo);

        const videoFile = data.LectureVideo?.[0];

        if (!videoFile) {
            toast.error("Video file is required");
            return;
        }

        formData.append("video", videoFile);
        setLoading(true);

        const result = await createSubSection(formData, token);

        if (result) {
            const updatedCourseContent = course.coursecontent.map((section) =>
                section._id === modalData ? result : section
            );
            const updatedCourse = { ...course, coursecontent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }

        setmodalaData(null);
        setLoading(false);
    };

    return (
        <div>
            <div className="mainBodyofSubSectionModal">
                <div className="topheading">
                    <p className="Modalheading">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>
                    <button
                        className="crossbutton"
                        onClick={() => (!loading ? setmodalaData(null) : {})}
                    >
                        <RxCross1 />
                    </button>
                </div>

                <div className="nextBody">
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <input
                            type="file"
                            accept="video/*"
                            {...register("LectureVideo", { required: true })}
                        />

                        <div className="lectureTitle">
                            <label htmlFor="LectureTitle">Lecture Title</label>
                            <input
                                type="text"
                                id="LectureTitle"
                                placeholder="Enter Lecture Title"
                                {...register("LectureTitle", { required: true })}
                            />
                            {errors.LectureTitle && <span>Lecture Title is required</span>}
                        </div>

                        <div className="lecturedescription">
                            <label htmlFor="LectureDesc">Lecture Description</label>
                            <textarea
                                id="LectureDesc"
                                placeholder="Enter Lecture Description"
                                {...register("LectureDesc", { required: true })}
                            ></textarea>
                            {errors.LectureDesc && <span>Lecture Description is required</span>}
                        </div>

                        <div className="allbuttonofModal">
                            {!view && (
                                <IconBtn text={loading ? "Loading.." : edit ? "Save Changes" : "Save"} />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
