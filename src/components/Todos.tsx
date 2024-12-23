import { Todo as TodoType, TodoId, ListOfTodos, TodoStatus } from '../types'
import { Todo } from './Todo'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
    todos: ListOfTodos
    onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodo: (id: TodoId) => void
    onEditTodo: (id: TodoId, newTitle: string, newStatus: TodoStatus) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleted, onEditTodo }) => {
    return (
        <ul className='space-y-4'>
            <AnimatePresence>
                {todos.map(todo => (
                    <motion.li
                        key={todo.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Todo
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onRemoveTodo={onRemoveTodo}
                            onToggleCompleted={onToggleCompleted}
                            onEditTodo={onEditTodo}
                        />
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    )
}

