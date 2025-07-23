

export type Task = {
    title: string,
    description: string,
    priority: 'Low' | 'High',
    dueDate: Date,
    status: 'Pending' | 'Completed'
}