import React from 'react'

const EmployeeTable = ({employees, onEdit, onDelete, onDeleteMultiple, onSelectAll}) => {
    const handleSelectAll=()=>{
        onSelectAll()
    }
  return (
    <div>
      <input type='checkbox' onClick={handleSelectAll}/>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Gender</th>
                <th>Age</th>
                <th>State</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {employees.map((employee, index)=>{
                <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.age}</td>
                    <td>{employee.state}</td>
                    <td>
                        <button onClick={()=>onEdit(employee)}>Edit</button>
                        <button onClick={()=>onDelete(index)}>Delete</button>
                    </td>
                </tr>
            })}
        </tbody>
      </table>
      <button onClick={onDeleteMultiple}>Delete Selected</button>
    </div>
  )
}

export default EmployeeTable
