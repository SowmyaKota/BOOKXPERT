
import React from 'react';
import './Modal.css';

const Modal = ({ title, onClose, children }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h3>{title}</h3>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Modal;
