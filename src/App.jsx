import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  function addTask() {
    if (task.trim() === '') return

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setTask('')
  }

  function deleteTask(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function toggleTask(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  function startEditing(todo) {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  function saveEdit(id) {
    if (editText.trim() === '') return

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: editText }
          : todo
      )
    )

    setEditingId(null)
    setEditText('')
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'pending') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="app">
      <div className="todo-container">
        <h1>My To-Do List 📝</h1>
        <p className="subtitle">Plan your day, achieve your goals!</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />

          <button className="add-btn" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="filters">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('pending')}>Pending</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>

        <h3>My Tasks ({filteredTodos.length})</h3>

        {filteredTodos.length === 0 ? (
          <p className="empty-message">No tasks found! ✨</p>
        ) : (
          <ul className="task-list">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={todo.completed ? 'completed' : ''}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTask(todo.id)}
                />

                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />

                    <button onClick={() => saveEdit(todo.id)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{todo.text}</span>

                    <button onClick={() => startEditing(todo)}>
                      Edit
                    </button>
                  </>
                )}

                <button onClick={() => deleteTask(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
