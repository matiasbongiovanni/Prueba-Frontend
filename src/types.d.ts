export interface Todo {
    id: string
    title: string
    completed: boolean
}

export type TodoId = string
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>
export type TodoStatus = 'Pendiente' | 'Completado'

export type ListOfTodos = Todo[]

export interface TaskState {
    title: string
    status: TodoStatus
}

