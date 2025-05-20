import React, { useState, useEffect } from 'react';
import { deleteEmployee, getEmployees } from './EmployeeService';
import EmployeeChart from './EmployeeChart';
import Modal from './Modal';
import jsPDF from 'jspdf';
import './EmployeeList.css';
import autoTable from 'jspdf-autotable'

const EmployeeList = ({ onEdit }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showChartModal, setShowChartModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const recordsPerPage = 5;

  useEffect(() => {
    getEmployees()
      .then(data => setEmployees(data))
  }, []);

  const handleEditClick=employee=>{
    onEdit(employee)
  }

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0) {
      alert("You did not select any employee. Please select employees) to delete.");
      return;
    }
  
    try {
      await Promise.all(selectedIds.map(id => deleteEmployee(id)));
      setEmployees(prev => prev.filter(emp => !selectedIds.includes(emp.id)));
      setSelectedIds([]);
      setSelectAll(false);
    } catch (err) {
      console.error("Error deleting selected employees:", err);
    }
  };
  

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id)
        .then(() => {
          setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete.id));
          setEmployeeToDelete(null);
        })
        .catch(console.error);
    }
    setShowDeleteDialog(false);
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    const currentIds = paginatedEmployees.map(emp => emp.id);
    if (checked) {
      setSelectedIds(prev => [...new Set([...prev, ...currentIds])]);
    } else {
      setSelectedIds(prev => prev.filter(id => !currentIds.includes(id)));
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => {
      const updated = prev.includes(id)
        ? prev.filter(empId => empId !== id)
        : [...prev, id];
      return updated;
    });
  };

  const handleSort = (field) => {
    const order = (field === sortField && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const filteredEmployees = employees
    .filter(emp => emp.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      return typeof aValue === 'string'
        ? (sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue))
        : (sortOrder === 'asc' ? aValue - bValue : bValue - aValue);
    });

  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedEmployees = filteredEmployees.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteDialog(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

  const tableColumn = ["ID", "Name", "Designation", "Joining Date","Salary","State"]; 
  const tableRows = [];

  employees.forEach(emp => {
    const rowData = [
      emp.id,
      emp.name,
      emp.designation,
      emp.doj,
      emp.salary,
      emp.gender,
      emp.state
    ];
    tableRows.push(rowData);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    margin: { top: 10 },
    styles: { fontSize: 10 },
  });

  doc.save("employee_list.pdf");
  };

  

  const totalSalary = employees.reduce((sum, emp) => sum + Number(emp.salary), 0);

  return (
    <div className='employee-table'>
      <h2>Employee List</h2>

      <div className="button-group">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button onClick={handleBatchDelete}>Delete Selected</button>
        <button onClick={() => setShowChartModal(true)}>Show Chart</button>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => setShowReportModal(true)}>View Report</button>
      </div>

      <table>
        <thead>
          <tr>
            <th><input type='checkbox' checked={selectAll} onChange={handleSelectAll} /></th>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("designation")}>Designation</th>
            <th >DOJ </th>
            <th onClick={() => handleSort("salary")}>Salary</th>
            <th>Gender</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map(emp => (
            <tr key={emp.id}>
              <td><input type='checkbox' checked={selectedIds.includes(emp.id)} onChange={() => handleSelectOne(emp.id)} /></td>
              <td>{emp.id}</td>
              <td><span style={{color:'blue', cursor:'pointer'}} 
              onClick={()=>{console.log("Employee clicked:", emp);
                onEdit(emp);
              }}>
                {emp.name}</span></td>
              <td>{emp.designation}</td>
              <td >{new Date(emp.doj).toLocaleDateString()}</td>
              <td>{emp.salary}</td>
              <td>{emp.gender}</td>
              <td>{emp.state}</td>
              <td>
                <button onClick={() => handleDeleteClick(emp)} className='delete-btn'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>

      <p>Total Salary: ₹ {(totalSalary / 100000).toFixed(1)} lakhs</p>

      {showChartModal && (
        <Modal title="Employee Chart" onClose={() => setShowChartModal(false)}>
          <EmployeeChart employees={employees} />
        </Modal>
      )}

      {showReportModal && (
        <Modal title="Employee Report" onClose={() => setShowReportModal(false)}>
          <iframe src="/sample-report.pdf" width="100%" height="500px" title="Employee Report" />
        </Modal>
      )}

      {showDeleteDialog && (
        <Modal title="Confirm Deletion" onClose={() => setShowDeleteDialog(false)}>
          <p>Are you sure you want to delete this employee?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={() => setShowDeleteDialog(false)}>No</button>
        </Modal>
      )}
    </div>
  );
};

export default EmployeeList;
