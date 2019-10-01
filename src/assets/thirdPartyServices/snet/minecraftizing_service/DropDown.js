import React from "react";

const RandomDropDown = ({ name, list, value, onChange, ...restProps }) => {
  return (
    <select
      name={name}
      value={value}
      style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
      onChange={onChange}
      {...restProps}
    >
      {list.map(item => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
};

export default RandomDropDown;

