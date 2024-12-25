import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./RequirementsField.css"


export default function RequirementsField({ name, label, register, setValue, errors, getValues }) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList];
    updatedRequirements.splice(index, 1);
    setRequirementsList(updatedRequirements);
  };

  return (
    <div className="requirements-field-container">
      <label className="requirements-label" htmlFor={name}>
        {label} <sup className="required-mark">*</sup>
      </label>
      <div className="input-container">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="input-field"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="add-button"
        >
          Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="requirements-list">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="requirement-item">
              <span>{requirement}</span>
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="error-message">{label} is required</span>
      )}
    </div>
  );
}
