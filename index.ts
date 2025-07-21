export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export class TaskManager<T extends Task> {
    private tasks: T[] = [];

    addTask(task: T): void {
        this.tasks.push(task);
    }

    removeTask(id: number): void {
        this.tasks = this.tasks.filter(i => i.id !== id);
    }

    toggleComplete(id: number): void {
        this.tasks.forEach(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
        });
    }

    getAllTasks(): T[] {
        return this.tasks;
    }

    getCompletedTasks(): T[] {
        return this.tasks.filter(i => i.completed);
    }

    getPendingTasks(): T[] {
        return this.tasks.filter(i => !i.completed);
    }

    findTaskById(id: number): T | undefined {
        return this.tasks.find(i => i.id === id);
    }

    updateTask(id: number, updatedFields: Partial<T>): void {
        const task = this.findTaskById(id);
        if (task) {
            Object.assign(task, updatedFields);
        }
    }

    clearCompletedTasks(): void {
        this.tasks = this.tasks.filter(i => !i.completed);
    }

    countTasks(): number {
        return this.tasks.length;
    }
}
