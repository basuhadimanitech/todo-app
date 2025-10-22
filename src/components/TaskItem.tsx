import React from 'react';
import type { Task } from '../types';
import '../styles/TaskItem.css';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const getInitial = (title: string) => {
    return title.charAt(0).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
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
    <div className={`task-item ${task.status}`}>
      <div className="task-content">
        <div className="task-avatar">
          {getInitial(task.title)}
        </div>
        <div className="task-details">
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <div className="task-status-badge">
              <span className={`status-dot ${task.status}`}></span>
              <span className="status-text">{getStatusLabel(task.status)}</span>
            </div>
          </div>
          <p className="task-description">{task.description}</p>
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
      </div>
      <div className="task-actions">
        <button 
          className="action-btn edit-btn" 
          onClick={() => onEdit(task)}
          aria-label="Edit task"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.3333 2.00004C11.5084 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6667 1.44775C12.9146 1.44775 13.1598 1.49653 13.3886 1.59129C13.6173 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38272 14.4088 2.61149C14.5035 2.84026 14.5523 3.08543 14.5523 3.33337C14.5523 3.58131 14.5035 3.82648 14.4088 4.05525C14.314 4.28402 14.1751 4.49161 14 4.66671L5 13.6667L1.33333 14.6667L2.33333 11L11.3333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          className="action-btn delete-btn" 
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4H3.33333H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.33333 4.00004V2.66671C5.33333 2.31309 5.47381 1.97395 5.72386 1.7239C5.97391 1.47385 6.31304 1.33337 6.66667 1.33337H9.33333C9.68696 1.33337 10.0261 1.47385 10.2761 1.7239C10.5262 1.97395 10.6667 2.31309 10.6667 2.66671V4.00004M12.6667 4.00004V13.3334C12.6667 13.687 12.5262 14.0261 12.2761 14.2762C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31304 14.6667 3.97391 14.5262 3.72386 14.2762C3.47381 14.0261 3.33333 13.687 3.33333 13.3334V4.00004H12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

