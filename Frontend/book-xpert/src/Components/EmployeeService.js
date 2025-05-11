
import axios from 'axios';

const API_URL = "http://localhost:5073/api/employee"; 

export const getEmployees = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
};

export const addEmployee = async (employee) => {
    try {
        const response = await axios.post(API_URL, employee);
        return response.data;
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
};

export const updateEmployee = async (id, employee) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employee);
        return response.data;
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
};
