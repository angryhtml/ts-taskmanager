import React, { useEffect, useState } from 'react';
import { TaskManager, Task } from './task-manager';

console.log('Tailwind config loaded, darkMode: class');

function App() {
  
  const [taskManager] = useState(() => new TaskManager<Task>());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    console.log('SOMETHING HAPPENED')
    return saved === 'dark';
  });
  console.log('App rendering, isDarkMode:', isDarkMode);
  console.log('HTML class:', document.documentElement.className);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        const parsedTasks: Task[] = JSON.parse(saved);
        parsedTasks.forEach(task => taskManager.addTask(task));
        updateTasks();
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    console.log('FIRST LOAD')
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const updateTasks = () => {
    setTasks([...taskManager.getAllTasks()]);
  };

  const handleAddTask: any = () => {
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

  const toggleTheme = () => {
    // document.documentElement.classList.toggle('dark')
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );




  return (

    <div className='
      min-h-screen 
      bg-gradient-to-br from-slate-50 to-indigo-300
      dark:bg-gradient-to-br dark:from-slate-500 dark:to-indigo-950
      text-gray-900 dark:text-gray-50
      transition-colors duration-300
      p-4 md:p-8
    '>

      <header className='max-w-3xl mx-auto mb-8'>
        <div className='flex justify-between items-center'>

          <button
            onClick={toggleTheme}
            className='
              relative
              w-20 h-10
              bg-gradient-to-r from-yellow-200 via-gray-300 to-indigo-900
              rounded-full
              overflow-hidden
              shadow-lg
              transition-all duration-500
              hover:scale-105
              '
            aria-label='Toggle theme'
          >
          
            <div className={`
              absolute top-1
              w-8 h-8
              rounded-full
              bg-gradient-to-br from-yellow-300 to-orange-400
              dark:from-gray-300 dark:to-gray-400
              shadow-lg
              transition-all duration-500
              ${isDarkMode ? 'left-10' : 'left-1'}
            `}>
            
              {isDarkMode && (
                <>
                  <div className='absolute w-1 h-1 bg-gray-500 rounded-full top-2 left-3'></div>
                  <div className='absolute w-2 h-2 bg-gray-600 rounded-full top-5 left-5'></div>
                  <div className='absolute w-1.5 h-1.5 bg-gray-500 rounded-full top-7 left-2'></div>
                </>
              )}
            </div>

            {isDarkMode && (
              <>
                <div className='absolute w-1 h-1 bg-white rounded-full top-3 left-3 animate-pulse'></div>
                <div className='absolute w-0.5 h-0.5 bg-white rounded-full top-6 left-14 animate-pulse delay-100'></div>
                <div className='absolute w-0.5 h-0.5 bg-white rounded-full top-8 left-8 animate-pulse delay-200'></div>
              </>
            )}

            {!isDarkMode && (
              <>
                <div className='absolute w-4 h-2 bg-white rounded-full top-3 left-10 opacity-80'></div>
                <div className='absolute w-3 h-1.5 bg-white rounded-full top-6 left-12 opacity-60'></div>
              </>
            )}
          </button>
        </div>
        <p className='text-gray-600 dark:text-gray-300 mt-2'>
          Organize your day, one task at a time
        </p>
      </header>

      <main className='max-w-3xl mx-auto'>
        <div className='
          mb-8 p-6
          bg-white/60 dark:bg-gray-800/80
          backdrop-blur-sm
          rounded-2xl shadow-lg
          '>
          <div className='flex flex-col sm:flex-row gap-3'>
            <input
              className='
                flex-1
                px-5 py-3
                bg-gray-50 dark:bg-gray-700
                border border-gray-200 dark:border-gray-600
                rounded-xl
                focus:outline-none focus:ring-2 focus:ring-blue-500
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all
                '
              type='text'
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder='What needs to be done?'
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <button
              onClick={handleAddTask}
              className='
                px-6 py-3
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white font-semibold
                rounded-xl
                hover:from-blue-600 hover:to-purple-700
                active:scale-95
                transition-all duration-200
                shadow-lg hover:shadow-xl
                '
            >
              Add Task
            </button>
          </div>
        </div>

        <div className='
          bg-white/60 dark:bg-gray-800/80
          backdrop-blur-sm
          rounded-2xl shadow-lg
          overflow-hidden
          '>

          <div className='
            px-6 py-4
            border-b border-gray-200 dark:border-gray-700
            flex justify-between items-center
            '>
            <h2 className='text-xl font-semibold'>Your Tasks</h2>
            <span className='
              px-3 py-1
              bg-blue-100 dark:bg-blue-900/30
              text-blue-700 dark:text-blue-300
              rounded-full text-sm font-medium
              '>
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          <div className='p-4'>
            {tasks.length === 0 ? (
              <div className='
                py-12 text-center
                text-gray-500 dark:text-gray-400
              '>
                <p className='text-lg'>No tasks yet</p>
                <p className='text-sm mt-1'>Add your first task above!</p>
              </div>
            ) : (
              <ul className='space-y-3'>
                {sortedTasks.map(task => (

                  <li
                    key={task.id}
                    className={`
                    group
                    p-4
                    ${task.completed
                        ? 'bg-green-100 dark:bg-green-900 hover:bg-green-200/60 dark:hover:bg-green-900/70'
                        : 'bg-gray-50/50 dark:bg-gray-700/50  hover:bg-indigo-200/20 dark:hover:bg-gray-700'} 
                     
                    border border-gray-200 dark:border-gray-600
                    rounded-xl
                    transition-all duration-200
                    flex items-center justify-between
                  `}
                  >
                    <div className='flex items-center gap-4'>
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`
                          w-6 h-6 flex items-center justify-center
                          rounded-lg border-2
                          transition-all duration-200
                          ${task.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 dark:border-gray-500 hover:border-blue-500'
                          }
                        `}
                      >
                        {task.completed && (
                          <span className='text-white text-sm'>✓</span>
                        )}
                      </button>

                      <span className={`
                        text-lg
                        transition-all duration-200
                        ${task.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-800 dark:text-gray-200'
                        }
                      `}>
                        {task.title}
                      </span>
                    </div>

                    {/* Кнопка удаления */}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className='
                        p-2
                        text-gray-500 dark:text-gray-400
                        hover:text-red-500 dark:hover:text-red-400
                        hover:bg-red-100 dark:hover:bg-red-900/50
                        rounded-lg
                        opacity-0 group-hover:opacity-100
                        transition-all duration-200
                      '
                      aria-label='Delete task'
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
