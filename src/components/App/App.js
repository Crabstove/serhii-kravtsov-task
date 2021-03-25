import React from "react";
import axios from "axios";

import { GetButton, Header, EmployeeTableRow } from "..";

import "./App.css";

const initialEmployeesState = {
  items: [],
  length: 0
};

const employeesReducer = (state, action) => {
  switch (action.type) {
    case "load": {
      return { ...state, items: action.payload };
    }
    case "delete": {
      const { id } = action.payload;
      return { ...state, items: state.items.filter(el => el.id !== id) };
    }
    default:
      return state;
  }
};

const App = () => {
  // logic is usually not kept in App.js, but for the sake of simplicity I put it here
  // ideally logic is kept outside of App.js wrapped into functional components

  const [isClicked, setIsClicked] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const [employeeState, dispatch] = React.useReducer(
    employeesReducer,
    initialEmployeesState
  );

  const fetchEmployees = async () => {
    setIsClicked(true);
    setLoading(true);
    setError(false);

    try{
      const res = await axios.get("http://dummy.restapiexample.com/api/v1/employees")
      if (res.status === 200){
        dispatch({ type: "load", payload: res.data.data });
      }
    } catch(err) {
        setError(true);
        setLoading(false);
        return null;
      };
    setLoading(false);
  };

  const handleDelete = id => dispatch({ type: "delete", payload: { id } });

  const renderEmployees = React.useMemo(() => {
    if (employeeState.items && employeeState.items.length) {
      return employeeState.items.map((el, i) => (
        <EmployeeTableRow
          key={i}
          name={el.employee_name}
          age={el.employee_age}
          salary={el.employee_salary}
          onDelete={() => handleDelete(el.id)}
        />
      ));
    }
    else {
      <h1> HELLO </h1>
    }
  }, [employeeState]);

  return (
    <div className="App">
      <Header />

      {!employeeState.items.length && !isClicked && (
        <GetButton handleClick={fetchEmployees} />
      )}

      { isLoading ? "Loading..." : null }

      { isError ? "Something went wrong..." : null }

      {renderEmployees}
    </div>
  );
};

export default App;
