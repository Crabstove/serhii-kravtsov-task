import React from "react";

import "./GetButton.css";

const GetButton = ({ handleClick }) => {
  return (
    <button className="getButton" onClick={handleClick}>
      GET
    </button>
  );
};

export default GetButton;
