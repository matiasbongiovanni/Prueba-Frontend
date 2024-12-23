import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { TodoId, Todo as TodoType, TodoStatus } from '../types'
import { FaEdit } from "react-icons/fa"
import { TaskEditor } from './EditTodo'
import { motion } from 'framer-motion'

interface Props extends TodoType {
    onRemoveTodo: (id: TodoId) => void
    onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onEditTodo: (id: TodoId, newTitle: string, newStatus: TodoStatus) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted, onEditTodo }) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleSave = (task: { title: string; status: TodoStatus }) => {
        onEditTodo(id, task.title, task.status)
        setIsEditing(false)
    }

    return (
        <motion.div 
            className="flex items-center justify-between p-4 bg-[#1C2D64]/20 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#1C2D64]/50"
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-center flex-grow mr-4">
                <input
                    checked={completed}
                    type="checkbox"
                    onChange={(event) => {
                        onToggleCompleted({ id, completed: event.target.checked })
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <label className={`ml-2 ${completed ? 'line-through text-gray-400' : 'text-white'}`}>{title}</label>
            </div>
            <div className="flex items-center">
                <motion.button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 hover:text-blue-600 mr-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaEdit className="h-5 w-5" />
                </motion.button>
                <motion.button
                    onClick={() => onRemoveTodo(id)}
                    className="text-red-500 hover:text-red-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <RxCross2 className="h-5 w-5" />
                </motion.button>
            </div>
            {isEditing && (
                <TaskEditor
                    initialTask={{ title, status: completed ? "Completado" : "Pendiente" }}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </motion.div>
    )
}

