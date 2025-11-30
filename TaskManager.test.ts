import { describe, it, expect } from '@jest/globals'
import { TaskManager, Task } from './src/task-manager';

describe('TaskManager', () => {
    it('should add a task', () => {
        const manager = new TaskManager<Task>();
        const task: Task = { id: 1, title: 'Test Task', completed: false };

        manager.addTask(task);
        const tasks = manager.getAllTasks();

        expect(tasks).toHaveLength(1);
        expect(tasks[0]).toEqual(task);
    })

    it('should remove a task', () => {
        const manager = new TaskManager<Task>();
        const task: Task = { id: 1, title: 'Test Task', completed: false };

        manager.addTask(task);
        manager.removeTask(task.id);
        const tasks = manager.getAllTasks();

        expect(tasks).toHaveLength(0);
    })

    it('should track and change the status of a task', () => {
        const manager = new TaskManager<Task>();
        const task: Task = { id: 1, title: 'Test Task', completed: false };

        manager.addTask(task);
        let tasks = manager.getAllTasks();

        expect(tasks[0].completed).toBe(false);
        manager.toggleComplete(task.id);
        tasks = manager.getAllTasks();

        expect(tasks[0].completed).toBeTruthy();
    })

    it('should get all tasks', () => {
        const manager = new TaskManager<Task>();
        const task1: Task = { id: 1, title: 'Test Task 1', completed: false };
        const task2: Task = { id: 2, title: 'Test Task 2', completed: true };

        manager.addTask(task1);
        manager.addTask(task2);
        const tasks = manager.getAllTasks();

        expect(tasks).toContainEqual(task1);
        expect(tasks).toContainEqual(task2);
        expect(tasks).toHaveLength(2);
    })

    it('should get all completed tasks', () => {
        const manager = new TaskManager<Task>();
        const task1: Task = { id: 1, title: 'Test Task 1', completed: false };
        const task2: Task = { id: 2, title: 'Test Task 2', completed: true };

        manager.addTask(task1);
        manager.addTask(task2);
        const completedTasks = manager.getCompletedTasks();

        expect(completedTasks).toContainEqual(task2);
        expect(completedTasks).not.toContainEqual(task1);
        expect(completedTasks).toHaveLength(1);
    })

    it('should get pending tasks', () => {
        const manager = new TaskManager<Task>();
        const task1: Task = { id: 1, title: 'Test Task 1', completed: false };
        const task2: Task = { id: 2, title: 'Test Task 2', completed: true };

        manager.addTask(task1);
        manager.addTask(task2);
        const pendingTasks = manager.getPendingTasks();

        expect(pendingTasks).toContainEqual(task1);
        expect(pendingTasks).not.toContainEqual(task2);
        expect(pendingTasks).toHaveLength(1);
    })

    it('should find task by ID', () => {
        const manager = new TaskManager<Task>();
        const task1: Task = { id: 1, title: 'Test Task 1', completed: false };
        const task2: Task = { id: 2, title: 'Test Task 2', completed: true };

        manager.addTask(task1);
        manager.addTask(task2);
        const findTaskById1 = manager.findTaskById(1);
        const findTaskById2 = manager.findTaskById(2);

        expect(findTaskById1).toEqual(task1);
        expect(findTaskById2).toEqual(task2);
        expect(manager.findTaskById(3)).toBeUndefined();
    })

    it('should update task', () => {
        const manager = new TaskManager<Task>();
        const task: Task = { id: 1, title: 'Test Task 1', completed: false };

        manager.addTask(task);
        manager.updateTask(1, { title: 'Updated Task Title' });

        const updatedTask = manager.findTaskById(1)!;
        expect(updatedTask.title).toBe('Updated Task Title');
        expect(updatedTask.completed).toBe(false);
    })

    it('should clear completed tasks', () => {
        const manager = new TaskManager<Task>();
        const task1: Task = { id: 1, title: 'Test Task 1', completed: false };
        const task2: Task = { id: 2, title: 'Test Task 2', completed: true };

        manager.addTask(task1);
        manager.addTask(task2);

        manager.clearCompletedTasks();

        const tasks = manager.getAllTasks();

        expect(tasks).toContainEqual(task1);
        expect(tasks).not.toContainEqual(task2);
        expect(tasks).toHaveLength(1);
    })

    it('should count all tasks', () => {
        const manager = new TaskManager<Task>();
        const task1: Task = { id: 1, title: 'Test Task 1', completed: false };
        const task2: Task = { id: 2, title: 'Test Task 2', completed: true };
        const task3: Task = { id: 3, title: 'Test Task 3', completed: false };
        const task4: Task = { id: 4, title: 'Test Task 4', completed: true };

        manager.addTask(task1);
        manager.addTask(task2);
        manager.addTask(task3);
        manager.addTask(task4);

        const total = manager.countTasks();
        expect(total).toBe(4);
    })

    it('should not throw when trying to remove non-existing task', () => {
        const manager = new TaskManager<Task>();
        expect(() => manager.removeTask(999)).not.toThrow();
    });

    it('should do nothing when toggling comletion of non-existing task', () => {
        const manager = new TaskManager<Task>();
        const task: Task = { id: 1, title: 'Test Task', completed: false };

        manager.addTask(task);
        manager.toggleComplete(999);

        const tasks = manager.getAllTasks();
        expect(tasks[0].completed).toBe(false);
    })

    it('should do change nothing when update of non-existing task', () => {
        const manager = new TaskManager<Task>();
        const task: Task = { id: 1, title: 'Test Task', completed: false };

        manager.addTask(task);
        manager.updateTask(999, { title: 'New update' });

        const updatedTask = manager.findTaskById(1)!;
        expect(updatedTask.title).toBe('Test Task');
        expect(updatedTask.completed).toBe(false);
    })
})
