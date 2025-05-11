// src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { getEmployees } from '../services/EmployeeService';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error("Failed to load employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>{employee.name} - {employee.designation}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
