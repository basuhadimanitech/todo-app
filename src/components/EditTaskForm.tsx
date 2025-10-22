import React, { useState } from 'react';
import type { Task } from '../types';
import '../styles/EditTaskForm.css';

interface EditTaskFormProps {
  task: Task;
  onUpdate: (id: string, title: string, description: string, status: Task['status']) => void;
  onCancel: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<Task['status']>(task.status);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onUpdate(task.id, title.trim(), description.trim(), status);
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'inProgress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
    }
  };

  return (
    <div className="edit-task-overlay">
      <div className="edit-task-form-container">
        <div className="form-header">
          <button className="back-btn" onClick={onCancel}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2>Edit Task</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Enter the description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows={4}
            />
          </div>
          <div className="form-group status-group">
            <div className="status-selector" onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
              <div className="status-display">
                <span className={`status-radio ${status}`}></span>
                <span>{getStatusLabel(status)}</span>
              </div>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                className={`dropdown-arrow ${showStatusDropdown ? 'open' : ''}`}
              >
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {showStatusDropdown && (
              <div className="status-dropdown">
                <div 
                  className={`status-option ${status === 'pending' ? 'selected' : ''}`}
                  onClick={() => {
                    setStatus('pending');
                    setShowStatusDropdown(false);
                  }}
                >
                  <span className="status-radio pending"></span>
                  <span>Pending</span>
                </div>
                <div 
                  className={`status-option ${status === 'inProgress' ? 'selected' : ''}`}
                  onClick={() => {
                    setStatus('inProgress');
                    setShowStatusDropdown(false);
                  }}
                >
                  <span className="status-radio inProgress"></span>
                  <span>In Progress</span>
                </div>
                <div 
                  className={`status-option ${status === 'completed' ? 'selected' : ''}`}
                  onClick={() => {
                    setStatus('completed');
                    setShowStatusDropdown(false);
                  }}
                >
                  <span className="status-radio completed"></span>
                  <span>Completed</span>
                </div>
              </div>
            )}
          </div>
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={!title.trim()}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;

