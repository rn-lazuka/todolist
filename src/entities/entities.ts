export interface ITask {
    id: string
    title: string
    description: null | string
    completed: boolean
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: null | string
    deadline: null | string
    addedDate: string
}

export interface ITodoList {
    id: string
    title: string
    addedDate?: string
    order?: number
    tasks:Array<ITask>
}