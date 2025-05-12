import React, { useState, useEffect } from 'react';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList';
import { getEmployees } from './Components/EmployeeService';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null); 
  
  useEffect(() => {
    getEmployees().then(setEmployees).catch(console.error);
  }, []);

  const handleSave = (updatedEmployee) => {
    console.log("Employee Updated", updatedEmployee);
    setEmployeeToEdit(null);
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee); 
  };

  return (
    <div>
      <EmployeeForm employeeToEdit={employeeToEdit} onSave={handleSave} 
      employees={employees}/>
      <EmployeeList onEdit={handleEdit} />
    </div>
  );
};

export default App;
