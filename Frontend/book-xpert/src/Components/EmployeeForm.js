import React, { useState, useEffect } from 'react';
import { addEmployee, updateEmployee } from './EmployeeService';

const EmployeeForm = ({ employeeToEdit, onSave, employees = [] }) => {
  const getTodayDate=()=> new Date().toISOString().split('T')[0]
  

  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    designation: '',
    salary: '',
    gender: '',
    state: '',
    dateOfBirth: getTodayDate(),
    age: '',
    doj: getTodayDate(),
  });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit); 
    }
  }, [employeeToEdit]);

  useEffect(()=>{
    if(employeeToEdit){
      setEmployee({
        ...employeeToEdit,
        doj:employeeToEdit.doj || getTodayDate()
      })
    }
  },[employeeToEdit])

  
  useEffect(() => {
    if (employee.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(employee.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--; 
      }
      setEmployee(prev => ({ ...prev, age: age }));
    }
  }, [employee.dateOfBirth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedEmployee = {
      ...employee,
      salary: Number(employee.salary), 
      age: Number(employee.age),
      dateOfBirth: employee.dateOfBirth || null,
      doj: employee.doj || getTodayDate(),
    };

    const isDuplicate = employees && employees.some(emp =>
      (emp.id === formattedEmployee.id || emp.name.toLowerCase() === formattedEmployee.name.toLowerCase()) &&
      emp.id !== formattedEmployee.id
    );
    
    if (isDuplicate) {
      alert("Duplicate employee ID or name found!");
      return;
    }

    if (formattedEmployee.id) {
      updateEmployee(formattedEmployee.id, formattedEmployee)
        .then(updatedEmployee => {
          onSave(updatedEmployee); 
        })
        .catch((error) => {
          console.error("Error updating employee:", error.response?.data?.errors || error.message);
        });
    } else {
      const { id, ...empWithoutId } = formattedEmployee; 
    
      addEmployee(empWithoutId)
        .then(onSave)
        .catch((error) => {
          console.error("Error adding employee:", error.response?.data || error.message);
        });
    }
  };
  
  const handleClear = () => {
    setEmployee({
      id: '',
      name: '',
      designation: '',
      salary: '',
      gender: '',
      state: '',
      dateOfBirth: '',
      age: '',
      doj: ''
    });
  };

  return (
    <div className='employee-form-table'>
      <h2>{employee.id ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
      <table>
      <tbody>
        <tr>
          <td><label>ID:</label></td>
          <td>
            <input type="text" name="id" value={employee.id || ''} onChange={handleChange} disabled={employee.id} />
          </td>
        </tr>
        <tr>
          <td><label>Name:</label></td>
          <td>
            <input type="text" name="name" value={employee.name} onChange={handleChange} required />
          </td>
        </tr>
        <tr>
          <td><label>Designation:</label></td>
          <td>
            <input type="text" name="designation" value={employee.designation} onChange={handleChange} required />
          </td>
        </tr>
        <tr>
          <td><label>Date of Joining:</label></td>
          <td>
            <input type="date" name="doj" value={employee.doj} onChange={handleChange} />
          </td>
        </tr>
        <tr>
          <td><label>Salary:</label></td>
          <td>
            <input type="number" name="salary" value={employee.salary} onChange={handleChange} required />
          </td>
        </tr>
        <tr>
          <td><label>Gender:</label></td>
          <td>
            <select value={employee.gender} onChange={handleChange} name="gender">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label>State:</label></td>
          <td>
            <input type="text" name="state" value={employee.state} onChange={handleChange} required />
          </td>
        </tr>
        <tr>
          <td><label>Date of Birth:</label></td>
          <td>
            <input type="date" name="dateOfBirth" value={employee.dateOfBirth} onChange={handleChange} required />
          </td>
        </tr>
        <tr>
          <td><label>Age:</label></td>
          <td>
            <input type="number" name="age" value={employee.age} onChange={handleChange} readOnly />
          </td>
        </tr>
        <tr>
          <td colSpan="2" style={{ textAlign: "center" }}>
            <button type="submit">{employee.id ? 'Update' : 'Add'} Employee</button>
            <button type="button" onClick={handleClear}>Clear Form</button>
          </td>
        </tr>
      </tbody>
    </table>
      </form>
    </div>
  );
};

export default EmployeeForm;
