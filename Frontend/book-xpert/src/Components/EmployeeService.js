import axios from 'axios';

const API_URL = 'http://localhost:5073/api/Employee';

export const getEmployees = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; 
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error; 
    }
};

export const addEmployee = async (employee) => {
    const { id, ...employeeWithoutId } = employee;
  
    const response = await axios.post(API_URL, employeeWithoutId);
    return response.data;
  };
  
export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employeeData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error; 
    }
};

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

export const downloadPDF = async () => {
    const response = await axios.get(`${API_URL}/download`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'EmployeeList.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  
