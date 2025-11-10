import { useState } from 'react'
import './App.css'
import InputVal from './InputVal'

let taskList = [
  // Heavy is the Crown
  // Congrats to T1 for winning Worlds 2025 / 6th championship :D
  {id: self.crypto.randomUUID(), name: '⭐', isEditing: false},
  {id: self.crypto.randomUUID(), name: '⭐⭐', isEditing: false},
  {id: self.crypto.randomUUID(), name: '⭐⭐⭐', isEditing: false},
  {id: self.crypto.randomUUID(), name: '⭐⭐⭐⭐', isEditing: false},
  {id: self.crypto.randomUUID(), name: '⭐⭐⭐⭐⭐', isEditing: false},
  {id: self.crypto.randomUUID(), name: '⭐⭐⭐⭐⭐⭐', isEditing: false}
]

function App() {
  const [ tasks, setTasks ] = useState(taskList)
  const [ newTask, setNewTask ] = useState('')

  const addTask = () => {
    setTasks([
      ...tasks,
      { 
        id: self.crypto.randomUUID(),
        name: newTask,
        isEditing: false
      }])
    setNewTask('')
  }

  // When edit something, we need to know which task to edit
  // --> using id of tasks 
  // Each edit button has the id of their associated task
  // click on edit button keeps id the same, 
  // while task name change and isEditing flips between true/false
  // NOTES: what happens when isEditing become true/false explained below

  const editTask = (id, e) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        // console.log('Im editing')
        return {
          ...task,
          name: e.target.value
        }
      } else {
        return task;
      }
    }))}

  // isEditing flips between true/false
  const toggleEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isEditing: !task.isEditing } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id != id))
  }

  return (
    <>
    {/* Adding new task */}
      <label>
        <input 
          value={newTask}
          onChange={e => setNewTask(e.target.value)}>
        </input>
      </label>
      <button onClick={addTask}>Add new task</button>

    {/* Rendering out the list along with edit / delete button */}
      <ul>
        
        {tasks.map((task) => {
    
          // isEditing is true --> insert input so we have inline input
          // Edit button changes name to Save (still the same function below)
          if (task.isEditing === true) {
            return (
              <li key={task.id}> 
                <input 
                  value={task.name}
                  onChange = {e => editTask(task.id, e)}
                />
                <button onClick={() => toggleEdit(task.id)}>Save</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            )

          // isEditing is false 
          // --> render list of tasks out + Edit button as usual
          } else if (task.isEditing === false) {
            return (
              <li key={task.id}> 
                {task.name}
                <button onClick={() => toggleEdit(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            )
          }
          
        })}
        <p> There are {tasks.length} components</p>
      </ul>

    </>
  )
}

export default App
