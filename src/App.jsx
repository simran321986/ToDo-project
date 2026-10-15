import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  function addTask() {
    if (task.trim() === '') {
      alert('Please enter a task!')
      return
    }

    setTasks([...tasks, { text: task, completed: false }])
    setTask('')
  }

  function toggleTask(index) {
    const updatedTasks = [...tasks]
    updatedTasks[index].completed = !updatedTasks[index].completed
    setTasks(updatedTasks)
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="app">
      <div className="todo-container">
        <h1>My To-Do List 📝</h1>
        <p className="subtitle">Plan your day, achieve your goals!</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />

          <button className="add-btn" onClick={addTask}>
            + Add
          </button>
        </div>

        <h3>My Tasks ({tasks.length})</h3>

        {tasks.length === 0 ? (
          <p className="empty-message">
            No tasks yet. Add your first task! ✨
          </p>
        ) : (
          <ul className="task-list">
            {tasks.map((item, index) => (
              <li
                key={index}
                className={item.completed ? 'completed' : ''}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(index)}
                  />
                  <span>{item.text}</span>
                </label>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="footer">
          Keep going! Every small step counts 💜
        </p>
      </div>
    </div>
  )
}

export default App
