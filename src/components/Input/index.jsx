import React from "react";
import "./style.scss";

const Input = () => {
  return (
    <div className="input">
      <input type="text" name="Search" />
      <button type="submit">Search</button>
    </div>
  );
};

export default Input;
