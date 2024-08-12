import { useEffect, useState } from "react";
import "./ContatctUs.css";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/Countrycode.json";

export default function ContatctUs() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                Email: "",
                FirstName: "",
                LastName: "",
                message: "",
                PhoneNumber: ""
            });
        }
    }, [reset, isSubmitSuccessful]);

    const SubmitContactform = async (data) => {
        console.log("Your data", data);

        try {
            setLoading(true);
            const response = { response: true };
            console.log("Your response", response);
            setLoading(false);
        } catch (error) {
            console.log("Error occurred while submitting the contact form");
            setLoading(false);
        }
    };

    return (
        <div className="contact_us_2">
            <div className="responsive-container-block big-container">
                <div className="blueBG"></div>
                <div className="responsive-container-block container">
                    <form className="form-box" onSubmit={handleSubmit(SubmitContactform)}>
                        <div className="container-block form-wrapper">
                            <p className="text-blk contactus-head">Get in Touch</p>
                            <p className="text-blk contactus-subhead">
                                We'd love to hear from you, Please fill out this form
                            </p>
                            <div className="responsive-container-block">
                                <div className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6" id="i10mt">
                                    <label className="text-blk input-title" htmlFor="FirstName">
                                        FIRST NAME
                                    </label>
                                    <input 
                                        className="input" 
                                        id="FirstName" 
                                        name="FirstName" 
                                        placeholder="Please enter first name..." 
                                        {...register("FirstName", { 
                                            required: { value: true, message: "Please Enter the First Name" } 
                                        })} 
                                    />
                                    {errors.FirstName && (
                                        <p className="error-message">{errors.FirstName.message}</p>
                                    )}
                                </div>
                                <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                    <label className="text-blk input-title" htmlFor="LastName">
                                        LAST NAME
                                    </label>
                                    <input className="input" id="LastName" name="LastName" placeholder="Please enter last name..." {...register("LastName")} />
                                </div>
                                <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                    <label className="text-blk input-title" htmlFor="Email">
                                        EMAIL
                                    </label>
                                    <input type="email" className="input" id="Email" name="Email" placeholder="Please enter email..." {...register("Email", { required: {value:true,message:"Please Enter the valid Email ID"} })} />
                                    {errors.Email && (
                                        <p className="error-message">{errors.Email.message}</p>
                                    )}
                                </div>
                                <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                               
                                    <label className="text-blk input-title" htmlFor="PhoneNumber">

                                        PHONE NUMBER
                                    </label>
                                    <div className="dropdown ">
                                            <select name="dropdown" id="dropdown" {...register("dropdown",{required:true})}>
                                                {
                                                       CountryCode.map((element,index)=>{
                                                        return(
                                                            <option value={element.code} key={index}>
                                                                 {element.code} -- {element.country}
                                                            </option>
                                                        )
                                                       })
                                                }
                                            </select>
                                        </div>
                                    <input type="number" className="input" maxLength={10} minLength={8} id="PhoneNumber" name="PhoneNumber" placeholder="Please enter phone number..." {...register("PhoneNumber", { required: {value:true, message:"Please Enter the Valid Mobile Number"},maxLength:{value:10, message:"Please enter the valid Mobile number"}, minLength:{value:8,message:"Please enter the valid mobile number"} })} />
                                    {errors.PhoneNumber && (
                                        <p className="error-message">{errors.PhoneNumber.message}</p>
                                    )}
                                </div>
                                <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i">
                                    <label className="text-blk input-title" htmlFor="message">
                                        WHAT DO YOU HAVE IN MIND
                                    </label>
                                    <textarea className="textinput" id="message" name="message" placeholder="Please enter query..." {...register("message", { required: {value:true,message:"Please enter the message from your side"} })}></textarea>
                                </div>
                                {errors.message && (
                                        <p className="error-message">{errors.message.message}</p>
                                    )}
                            </div>
                            <button className="submit-btn" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
