import React from "react";

import "./EmployeeTableRow.css";

const EmployeeTableRow = props => {
  const { name, age, salary, onDelete } = props;

  return (
    <div className="employee">
      <strong className="employee-name">{name}</strong>
      <div id="employee-age"> {age}</div>
      <div id="employee-salary">${salary}</div>
      <button className="delete-btn" onClick={onDelete}>-</button>
    </div>
  );
};

export default EmployeeTableRow;
