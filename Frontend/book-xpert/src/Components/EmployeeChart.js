import React, { useState } from 'react';
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57'];

const EmployeeChart = ({ employees }) => {
  const [chartType, setChartType] = useState('bar');

  const salaryByDesignation = employees.reduce((acc, emp) => {
    acc[emp.designation] = (acc[emp.designation] || 0) + Number(emp.salary);
    return acc;
  }, {});

  const chartData = Object.entries(salaryByDesignation).map(([designation, salary]) => ({
    designation,
    salary,
  }));

  return (
    <div className='chart-container'>
      <h3>Employee Salary by Designation</h3>
      <select value={chartType} onChange={e => setChartType(e.target.value)}
        className='chart-selected'>
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
      </select>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'bar' && (
          <BarChart data={chartData}>
            <XAxis dataKey="designation" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salary" fill="#8884d8" />
          </BarChart>
        )}

        {chartType === 'line' && (
          <LineChart data={chartData}>
            <XAxis dataKey="designation" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="salary" stroke="#82ca9d" />
          </LineChart>
        )}

        {chartType === 'pie' && (
          <PieChart>
            <Pie
              data={chartData}
              dataKey="salary"
              nameKey="designation"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeChart;
