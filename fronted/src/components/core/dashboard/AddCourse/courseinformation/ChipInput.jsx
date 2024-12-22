import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ChipInput({ label, name, placeholder, register, errors, setValue, getValues }) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue]);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    setChips(chips.filter((_, index) => index !== chipIndex));
  };

  return (
    <div className="chip-input-container">
      <label htmlFor={name} className="chip-input-label">
        {label} <sup>*</sup>
      </label>
      <div className="chip-input-wrapper">
        {chips.map((chip, index) => (
          <div key={index} className="chip">
            {chip}
            <button type="button" className="chip-delete-button" onClick={() => handleDeleteChip(index)}>
              <MdClose />
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="chip-input-field"
        />
      </div>
      {errors[name] && <span className="chip-input-error">{label} is required</span>}
    </div>
  );
}
