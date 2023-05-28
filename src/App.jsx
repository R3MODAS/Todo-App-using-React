import { useEffect, useRef, useState } from "react"
import { AiOutlinePlusCircle, AiTwotoneDelete, AiFillCheckCircle } from "react-icons/ai"
import { BsTrash3Fill } from "react-icons/bs"

function App() {
  const getItem = () => {
    const list = localStorage.getItem("todo");

    if(list){
      return JSON.parse(localStorage.getItem("todo"));
    }

    else{
      return [];
    }
  }

  const [TodoList, setTodoList] = useState(getItem());
  const inputVal = useRef();

  // Add Task to the TodoList
  const handleSubmit = (event) => {
    event.preventDefault();
    const task = {
      id: TodoList.length === 0 ? 1 : TodoList[TodoList.length - 1].id + 1,
      taskName: inputVal.current.value,
      completed: false
    }

    if (task.taskName === "") {
      alert("Please Enter some Task");
    }
    else {
      setTodoList([...TodoList, task]);
      inputVal.current.value = "";
    }
  }

  // Deletes the Task
  const handleDelete = (id) => {
    setTodoList(TodoList.filter((task) => task.id !== id));
  }

  // Marks if one Task is Done
  const handleComplete = (id) => {
    setTodoList(
      TodoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true }
        }
        else {
          return task;
        }
      })
    )
  }

  // Clears all the Data 
  const handleClear = () => {
    setTodoList([]);
    inputVal.current.value = "";
    localStorage.removeItem("todo");
    localStorage.clear();
  }

  // Store the Data in Local Storage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(TodoList));
  }, [TodoList])


  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1>Todo List</h1>

          {/* Main TodoForm */}
          <div className="TodoForm">
            <input type="text" placeholder="Enter the Task" ref={inputVal} autoComplete="off" title="Enter your Task" />
            <button type="submit" onClick={handleSubmit} title="Add Task"><AiOutlinePlusCircle /></button>
            <button onClick={handleClear} title="Reset"><BsTrash3Fill /></button>
          </div>

          {/* Todo List */}

          <ul className="TodoDisplay">
            {TodoList.map((task) => {
              return (
                <li className={`TodoItem ${task.completed && "complete"}`} key={task.id}>
                  <span className={`${task.completed && "mark"}`}>{task.taskName}</span>
                  <div className="buttons">
                    <button onClick={() => handleDelete(task.id)} title="Delete"><AiTwotoneDelete /></button>
                    <button onClick={() => handleComplete(task.id)} title="Complete"><AiFillCheckCircle /></button>
                  </div>
                </li>
              )
            })}

          </ul>
        </div>
      </div>
    </>
  )
}

export default App
