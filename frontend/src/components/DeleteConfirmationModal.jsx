// DeleteConfirmationModal.js
import React from 'react';
import '../assets/css/deleteModals.css';

// PROPS TO PASS FOR DELETE CONFIRMATION MODAL
const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Are you sure you want to delete this product?</h3>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Yes, Delete</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
