import { useState } from "react"
import { TodoTitle } from "../types"
import { motion } from "framer-motion"

interface Props {
    saveTodo: ({ title }: TodoTitle) => void
}

const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (inputValue.trim()) {
            saveTodo({ title: inputValue.trim() })
            setInputValue('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex items-center border-b-2 border-blue-500 py-2">
                <input
                    type="text" 
                    placeholder="¿Qué tareas te gustaría agregar?"
                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                />
                <motion.button 
                    type="submit" 
                    className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-4 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Agregar
                </motion.button>
            </div>
        </form>
    )
}

export default CreateTodo