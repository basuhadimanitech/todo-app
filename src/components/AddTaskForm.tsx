import React, { useState } from 'react';
import '../styles/AddTaskForm.css';

interface AddTaskFormProps {
  onAdd: (title: string, description: string) => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="add-task-overlay">
      <div className="add-task-form-container">
        <div className="form-header">
          <button className="back-btn" onClick={onCancel}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2>Add Task</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              autoFocus
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
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={!title.trim()}>
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;

