import { TodoTitle } from "../types"
import CreateTodo from "./CreateTodo"

interface Props {
    onAddTodo: ({ title }: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
    return (
        <header className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">Lista de Tareas</h1>
            <CreateTodo saveTodo={onAddTodo}/>
        </header>
    )
}

