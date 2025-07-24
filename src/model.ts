

export type Task = {
    _id?: string,
    title: string,
    description: string,
    priority: 'Low' | 'High',
    dueDate: Date,
    status: 'Pending' | 'Completed'
}