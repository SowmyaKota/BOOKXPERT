import React from 'react';

const ReportModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Employee Report</h3>
        <iframe
          src="http://localhost:5073/api/Employee/report"
          width="100%"
          height="500px"
          style={{ border: "none" }}
          title="Employee Report"
        ></iframe>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReportModal;
