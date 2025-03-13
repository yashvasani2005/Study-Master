
import { useForm } from "react-hook-form";
import "./SubSectionModal.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createSubSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/Courseslice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../courseinformation/ImageUpload";
import IconBtn from "../../../../../common/IconBtn";

export default function SubSectionModal(
    {
        modalData,
        setmodalaData,
        add = false,
        view = false,
        edit = false,
    }
) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,


    } = useForm();

    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("LectureTitle", modalData.title)
            setValue("LectureDesc", modalData.description)
            setValue("Lecturevideo", modalData.videoUrl)
        }
    }, [])

    const isFormUpdated = () => {
        const currentValue = getValues();
        if (currentValue.LectureTitle !== modalData.title

            || currentValue.LectureDesc !== modalData.description

            || currentValue.Lecturevideo !== modalData.videoUrl
        ) {
            return true;
        }
        else {
            return false;
        }

    }
    const handleEditSubSection = async () => {

        const currentValue = getValues();
        const formdata = FormData();
        formdata.append("sectionId", modalData.sectionId)
        formdata.append("subSectionId", modalData._id)

        if (currentValue.LectureTitle !== modalData.title) {
            formdata.append("title", currentValue.LectureTitle)
        }
        if (currentValue.LectureDesc !== modalData.description) {
            formdata.append("description", currentValue.LectureDesc)
        }
        if (currentValue.Lecturevideo !== modalData.videoUrl) {
            formdata.append("video", currentValue.Lecturevideo)
        }
        setloading(true)

        //API Call

        const result = updateSection(formdata, token)
        if (result) {
   
            const updatedcourseContent=course.coursecontent.map((section)=>section._id===modalData.sectionId ? result :section)
            const Updatedcourse={...course,coursecontent:updatedcourseContent}
            //extra soch na
            dispatch(setCourse(Updatedcourse));
        }

        setmodalaData(null);
        setloading(false);

    }
    const Onsubmit = async (data) => {
        if (view)
            return;

        if (edit) {
            if (!isFormUpdated) {
                toast.error("No changes made to the Form")
            }
            else {
                //edit karo

                handleEditSubSection();
            }
            return;
        }


        //ADD
        const formdata = new FormData();
        formdata.append("sectionId", modalData)
        formdata.append("title", data.LectureTitle)
        formdata.append("description", data.LectureDesc)
        formdata.append("video", data.Lecturevideo)

        setloading(true);

        //API call
        const result = await createSubSection(formdata, token)
    

        if (result) {
            //TODO: 
            const updatedcourseContent=course.coursecontent.map((section)=>section._id===modalData ? result :section)
            const Updatedcourse={...course,coursecontent:updatedcourseContent}
            //extra soch na
            dispatch(setCourse(Updatedcourse));
            // distpatch(setCourse(result)) 
        }
        setmodalaData(null)
        loading(false)


    }

    return (

        <div>

            <div className="mainBodyofSubSectionModal">
                <div className="topheading">
                    <p className="Modalheading">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button className="crossbutton"
                        onClick={() => (
                            !loading ? setmodalaData(null) : {}
                        )}
                    >
                        <RxCross1 />

                    </button>
                </div>

                <div className="nextBody">
                    <form action="" Onsubmit={handleSubmit(Onsubmit)}>
                        <Upload
                            name="LectureVideo"
                            label="LectureVideo"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            video={true}
                            viewData={view ? modalData.videoUrl : null}
                            editData={edit ? modalData.videoUrl : null}
                        />
                        <div className="lectureTitle">
                            <label htmlFor=""> Lecture Title</label>
                            <input type="text"
                                id="LectureTitle"
                                placeholder="Enter Lecture Title"
                                {...register("LectureTitle", { required: true })}
                            />
                            {errors.LectureTitle && (<span>Lecture Tile is required</span>)}
                        </div>
                        <div className="lecturedescription">
                            <label htmlFor=""> Lecture Description</label>
                            <textarea name="" id="LectureDesc"
                                placeholder="Enter Lecture Description"
                                {...register("LectureDesc",{ required: true })}

                            ></textarea>
                            {errors.LectureDesc && (<span>Lecture Description is required</span>)}
                        </div>
                       <button className="allbuttonofModal">
                        {
                            !view && (
                                <div>
                          <IconBtn
                              text={loading ?"Loading.. " : edit ?"Save Changes ":"Saves"}
                              />
                                </div>
                            )
                        }
                       </button>

                    </form>
                </div>


            </div>

        </div>
    );
}
