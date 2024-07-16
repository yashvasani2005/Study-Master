import { useSelector } from "react-redux";
import frameImg from "../../../src/assets/Images/frame.avif";
import LoginForm from "./Loginform";
import SignupForm from "./Signupform";
import "./Template.css";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="grid-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="container md:container-md">
          <div className="text-container">
            <h1 className="title">{title}</h1>
            <p className="description">
              <span className="text-dark">{description1}</span>{" "}
              <span className="text-highlight">{description2}</span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          <div className="image-container">
            <img
              src={frameImg}
              alt="Pattern"
              className="image-bg"
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              className="image-foreground"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
