import logo from './logo.svg';
import {useState} from 'react'
import './App.css';

function App() {
  const [tasks, setTasks] = useState(
    [
      {id:1, name: 'Buy Groceries', priority: "top-priority"},
      {id:2, name: 'Go to gym', priority: "top-priority"},
      {id:3, name: 'Finish homework', priority: "top-priority"}
    ]
  )
  const [newTask, setNewTask] = useState('')

  //We need to initialise a new state
  const [option, selectOption] = useState('')

  //when the button is clicked, log the current state in console bit of the inspect.
  const handleRadioClick = (evt) => {
    selectOption(evt.target.value)
    
  }
  //an evt is a click and the setNewTask function has to update the State with the new task as shown in const [newTask, setNewTask]
  const handleTaskInput = (evt) => {
    setNewTask(evt.target.value)
  }

  //the if has to be outside the return  
  const toDoListItems = tasks.map((task) => {
    if (task.priority === 'top-priority') {
      return (
        <li key = {task.id}>
          <b>{task.name}</b><br></br>
          <b>{task.priority}</b>
          <button onClick={ () => taskDone(task.id)}>Done</button>
        </li>
      )
    } else {
      return (
        <li key = {task.id}>
          {task.name}<br></br>
          {task.priority}
          <button onClick={ () => taskDone(task.id)}>Done</button>
        </li>
      )
    }
  })

  const saveNewTask = (evt) => {
    evt.preventDefault()
    const newTaskObj = {id:Date.now(), name: newTask, priority: option}
    const newListOfTasks = [...tasks, newTaskObj]
    setTasks(newListOfTasks)
    setNewTask('')
  } 

  const taskDone = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
    
  }

  return (
    <div className='App'>
    <h1>To Do List</h1>
    <hr></hr>
    <ul>
      {toDoListItems}
    </ul>

    <form onSubmit={saveNewTask}>
      <label htmlFor='new-task'>Task Name</label>
      <input id='new-task' type='text' value={newTask} onChange={handleTaskInput}></input>
      <div>
      {/* name has to be the same for both radio buttons so thatthey're not both checked at the same time. It's like a category. If I wanted 2 decisions with 2 options each, then the name for each decision would be different */}
        <input type="radio" id="top-priority" name='task' value="top-priority" onChange={handleRadioClick}></input>
        <label htmlFor="top-priority">Top priority</label>
      </div>

      <div>
        <input type="radio" id="low-priority" name='task' value="low-priority" onChange={handleRadioClick}></input>
        <label htmlFor="low-priority">Low priority</label>
      </div>
      <input type='submit' value='Save New Task'></input>
    </form>
    

    </div>
  
  );
}

export default App;
