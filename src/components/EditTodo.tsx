import { useState } from "react"
import { TaskState, TodoStatus } from '../types'
import { motion } from 'framer-motion'

interface Props {
  initialTask: TaskState
  onSave: (task: TaskState) => void
  onCancel: () => void
}

export const TaskEditor: React.FC<Props> = ({ initialTask, onSave, onCancel }) => {
  const [task, setTask] = useState<TaskState>(initialTask)

  const handleSave = () => {
    if (!task.title.trim()) {
      alert("El título no puede estar vacío.")
      return
    }
    onSave(task)
    onCancel()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#17213f] border-[#1C2D64] border-2 text-white rounded-lg w-full max-w-md p-6 space-y-6 relative"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Editar Tarea</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full px-3 py-2 bg-[#11182D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C2D64]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Estado</label>
            <div className="space-y-2">
              {["Pendiente", "Completado"].map((status) => (
                <label key={status} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={task.status === status}
                    onChange={() =>
                      setTask({ ...task, status: status as TodoStatus })
                    }
                    className="form-radio h-4 w-4 text-white"
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <motion.button
            onClick={onCancel}
            className="px-4 py-2 bg-[#11182D] text-white rounded-lg hover:bg-[#1C2D64] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={handleSave}
            className="px-4 py-2 bg-[#1C2D64] text-white rounded-lg hover:bg-[#1C2D64]/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Guardar
          </motion.button>
        </div>

        <motion.button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

