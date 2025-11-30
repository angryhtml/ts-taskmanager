import React, { useState } from 'react';
import { TaskManager, Task } from './task-manager';
import './App.css';

function App() {
  const [taskManager] = useState(() => new TaskManager<Task>());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const updateTasks = () => {
    setTasks([...taskManager.getAllTasks()]);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle.trim(),
        completed: false
      };
      taskManager.addTask(newTask);
      setNewTaskTitle('');
      updateTasks();
    }
  };

  const handleToggleTask = (id: number) => {
    taskManager.toggleComplete(id);
    updateTasks();
  };

  const handleDeleteTask = (id: number) => {
    taskManager.removeTask(id);
    updateTasks();
  };


  return (
    <div className="app">

      <h1>My task manager</h1>
      <div className="add-task-form">
        <input
          className='task-input'
          type='text'
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder='Start type your task'
        />
        <button
          className='add-button'
          onClick={handleAddTask}

        >
          Add
        </button>

      </div>

      <ul className='task-item'>


      </ul>
    </div>
  );
}

export default App;