import React, { useState } from 'react'

const EmployeeForm = ({onSave, employeeToEdit, onClear}) => {
    const [name, setName]=useState(employeeToEdit?.name || "")
    const [designation, setDesignation]=useState(employeeToEdit?.designation || "")
    const [dob, setDob]=useState(employeeToEdit?.dob || "")
    const [salary, setSalary]=useState(employeeToEdit?.salary || "")
    const [gender, setGender]=useState(employeeToEdit?.gender || "")
    const [age, setage]=useState(employeeToEdit?.age || "" )
    const [state, setState]=useState(employeeToEdit?.state || "")

    const handleAgeCalculation=e=>{
        const dateOfBirth=new Date(e.target.value)
        const currentAge=new Date().getFullYear()-dateOfBirth.getFullYear()
        setage(currentAge)
    }

    const handleSubmit=e=>{
        e.preventDefault()
        const newEmployee={name, designation, dob, salary, gender, state, age}
    }

    const handleClear=()=>{
        setName('')
        setDesignation('')
        setDob('')
        setGender('Male')
        setSalary('')
        setState('')
        setage('')
        onClear()
    }

   

  return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input type='text' value={name}
                 onChange={e=>setName(e.target.value)} required/>
            </div>
            <div>
                <label>Designation: </label>
                <input type='text' value={designation}
                 onChange={e=>setDesignation(e.target.value)} required/>
            </div>
            <div>
                <label>Date of Birth: </label>
                <input type='text' value={dob}
                 onChange={e=>{
                    setDob(e.target.value)
                 handleAgeCalculation(e)
                 }} required/>
            </div>
            <div>
                <label>Age: </label>
                <input type='text' value={age} disabled />
            </div>
            <div>
                <label>Salary: </label>
                <input type='text' value={salary}
                 onChange={e=>setSalary(e.target.value)} required/>
            </div>
            <div>
                <label>Gender: </label>
                <select value={gender}
                 onChange={e=>setGender(e.target.value)} required>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 </select>
            </div>
            <div>
            <label>State: </label>
                <select value={state}
                 onChange={e=>setState(e.target.value)} required>
                 <option value="Telangana">Telangana</option>
                 <option value="Andhra Pradesh">Andhra Pradesh</option>
                 <option value="Warangal">Warangal</option>
                 </select>
            </div>
            <button type='submit' >Save</button>
            <button type='button' onClick={handleClear}>Clear</button>
        </form>
  )
}

export default EmployeeForm
