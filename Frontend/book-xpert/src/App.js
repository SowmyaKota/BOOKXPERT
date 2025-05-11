
import { useState } from 'react';
import './App.css';
import ChartComponent from './Components/ChartComponent';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeTable from './Components/EmployeeTable';

function App() {
  const [formData, setFormData]=useState({
        name: '',
        designation: '',
        dob: '',
        age: '',
        salary: '',
        gender: '',
        state: ''
    })

  const [employees, setEmployees]=useState([])
  const [selectedEmployees, setSelectedEmployees]=useState([])
  const [employeeToEdit, setEmployeeToEdit]=useState(null)

  const handleSave=()=>{
    if(!formData.name || !formData.salary){
      alert("Please fill all required fields")
      return
    }
    setEmployees(prev=>[...prev, formData])
    alert("saved Employee data successfully!")
    
  }

 

  const handleClear=()=>{
    setFormData({
      name: '',
      designation: '',
      dob: '',
      age: '',
      salary: '',
      gender: '',
      state: ''
    })
    setEmployeeToEdit(null)
  }

  const handleEdit=employee=>{
    setEmployeeToEdit(employee)
  }

  const handleDelete=(indexToDelete)=>{
    setEmployees(prev=>prev.filter((_, i)=> i!==indexToDelete))
  }

  const handleDeleteMultiple=()=>{
    setEmployees(employees.filter((_, i)=> !selectedEmployees.includes(i)))
    setSelectedEmployees([])
  }

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map((_, index) => index));
    }
  };

  const handleSelectEmployee = (index) => {
    if (selectedEmployees.includes(index)) {
      setSelectedEmployees(selectedEmployees.filter(i => i !== index));
    } else {
      setSelectedEmployees([...selectedEmployees, index]);
    }
  };

  return (
    <div>
      <EmployeeForm formData={formData} setFormData={setFormData}
      onSave={handleSave} employeeToEdit={employeeToEdit} onClear={handleClear}/>
      <EmployeeTable
      employees={employees}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onDeleteMultiple={handleDeleteMultiple}
      onSelectAll={handleSelectAll}/>
      <ChartComponent data={employees}/>
    </div>
  );
}

export default App;
