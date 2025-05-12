import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map((emp) => emp.designation),
    datasets: [
      {
        label: 'Employee Salaries',
        data: data.map((emp) => emp.salary),
        backgroundColor: [
          '#FF5733',
          '#33FF57',
          '#3357FF',
          '#F3FF33',
          '#FF33D4',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default ChartComponent;
