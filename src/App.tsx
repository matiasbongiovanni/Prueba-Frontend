import { Todos } from './components/Todos'
import { Header } from './components/Header'
import { ListOfTodos, TodoId, TodoTitle, TodoStatus, type Todo as TodoType } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<ListOfTodos>('todos', [])

  const handleAddTodo = ({ title }: TodoTitle) => {
    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }
    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const handleRemoveTodo = (id: TodoId) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const handleToggleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed }
      }
      return todo
    }))
  }

  const handleEditTodo = (id: TodoId, newTitle: string, newStatus: TodoStatus) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle, completed: newStatus === "Completado" }
      }
      return todo
    }))
  }

  return (
    <main className="min-h-screen bg-[#11182D] text-white py-8 px-4">
      <section className="container mx-auto max-w-3xl">
        <Header onAddTodo={handleAddTodo} />
        <Todos
          todos={todos}
          onRemoveTodo={handleRemoveTodo}
          onToggleCompleted={handleToggleCompleted}
          onEditTodo={handleEditTodo}
        />
      </section>
    </main>
  )
}

export default App

