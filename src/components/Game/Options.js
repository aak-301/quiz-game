import React, { useState } from "react";
import "./options.css";

function Options(props) {
  const [selectedValue, setSelectedValue] = useState();
  const handleChange = async (e) => {
    console.log(e.target.value);
    setSelectedValue(e.target.value);
    props.selectedOptions(e.target.value, props.index);
    setTimeout(function () {
      setSelectedValue("");
    }, 1000);
  };

  return (
    <div className="options">
      {props.options.map((e) => (
        <div key={Math.random() * 100} className="individual-option">
          <input
            type="radio"
            value={e}
            onChange={handleChange}
            checked={selectedValue === e ? true : false}
          />
          <label className="radio" htmlFor="done" for={e}>
            {e}
          </label>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default Options;
