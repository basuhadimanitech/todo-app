import { useState, useEffect } from 'react';
import type { Task } from './types';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [expandedSections, setExpandedSections] = useState<{
    inProgress: boolean;
    pending: boolean;
    completed: boolean;
  }>({
    inProgress: true,
    pending: false,
    completed: false,
  });

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Debounce search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'inProgress',
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setShowAddForm(false);
  };

  const updateTask = (id: string, title: string, description: string, status: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title, description, status } : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleSection = (section: 'inProgress' | 'pending' | 'completed') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Filter tasks by search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group tasks by status
  const inProgressTasks = filteredTasks.filter(task => task.status === 'inProgress');
  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  return (
    <div className="app">
      <header className="app-header">
        <h1>TODO APP</h1>
      </header>

      <div className="app-content">
        <div className="search-container">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 19L14.65 14.65" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search To-Do"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
        </div>

        {/* In Progress Section */}
        <div className="task-section">
          <button
            className="section-header"
            onClick={() => toggleSection('inProgress')}
          >
            <span className="section-title">
              In Progress <span className="task-count">({inProgressTasks.length})</span>
            </span>
            <svg
              className={`chevron ${expandedSections.inProgress ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {expandedSections.inProgress && (
            <TaskList
              tasks={inProgressTasks}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          )}
        </div>

        {/* Pending Section */}
        <div className="task-section">
          <button
            className="section-header"
            onClick={() => toggleSection('pending')}
          >
            <span className="section-title">
              Pending <span className="task-count">({pendingTasks.length})</span>
            </span>
            <svg
              className={`chevron ${expandedSections.pending ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {expandedSections.pending && (
            <TaskList
              tasks={pendingTasks}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          )}
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <button
            className="section-header"
            onClick={() => toggleSection('completed')}
          >
            <span className="section-title">
              Completed <span className="task-count">({completedTasks.length})</span>
            </span>
            <svg
              className={`chevron ${expandedSections.completed ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {expandedSections.completed && (
            <TaskList
              tasks={completedTasks}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fab" onClick={() => setShowAddForm(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Add Task Form Modal */}
      {showAddForm && (
        <AddTaskForm
          onAdd={addTask}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Task Form Modal */}
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onUpdate={updateTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
