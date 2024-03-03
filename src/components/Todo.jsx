import { useEffect, useState } from "react";
import {
  AiOutlinePlusCircle,
  AiTwotoneDelete,
  AiFillEdit,
} from "react-icons/ai";
import { BsTrash3Fill } from "react-icons/bs";
import { RiEditCircleLine } from "react-icons/ri";

function Todo() {
  // Get Data from localStorage
  function getData(){
    const TodoList = localStorage.getItem("todoList");
    if(TodoList){
      return JSON.parse(TodoList)
    }
    else{
      return []
    }
  }

  // Local State
  const [TodoList, setTodoList] = useState(getData());
  const [InputTask, setInputTask] = useState("");
  const [ToggleBtn, setToggleBtn] = useState(true);
  const [ItemId, setItemId] = useState(null);

  // Adds a Task
  const handleAdd = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      name: InputTask
    }
    if(InputTask){
      setTodoList([...TodoList, task])
      setInputTask("")
    }
    else{
      alert("Please Enter some Task")
    }
  };

  // Edit a Task
  const handleEdit = () => {
    if(InputTask && !ToggleBtn){
      const editTask = TodoList.map(item => {
        if(item.id == ItemId){
          return {...item, name: InputTask}
        }
        return item
      })
      setTodoList(editTask)
      setToggleBtn(true)
      setItemId(null)
      setInputTask("")
    }
  }

  // Delete a Task
  const handleDelete = (id) => {
    const updatedTodoList = TodoList.filter(item => item.id !== id)
    setTodoList(updatedTodoList)
  };

  // Clears all the Task
  const handleClear = () => {
    setTodoList([])
  };

  // Handle Edit Task
  const handleEnableEdit = (id) => {
    const findTask = TodoList.find(item => item.id === id)
    setInputTask(findTask.name)
    setToggleBtn(false)
    setItemId(id)
  };

  // Add Data to the localStorage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(TodoList))
  }, [TodoList])
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1>Todo List</h1>

          {/* Main TodoForm */}
          <div className="TodoForm">
            <input
              type="text"
              placeholder="Enter the Task"
              autoComplete="off"
              title="Enter your Task"
              value={InputTask}
              onChange={(e) => setInputTask(e.target.value)}
            />
            {ToggleBtn === true ? (
              <button type="submit" onClick={handleAdd} title="Add Task">
                <AiOutlinePlusCircle />
              </button>
            ) : (
              <button type="submit" onClick={handleEdit} title="Edit Task">
                <RiEditCircleLine />
              </button>
            )}

            <button onClick={handleClear} title="Reset">
              <BsTrash3Fill />
            </button>
          </div>

          {/* Todo List */}

          <ul className="TodoDisplay">
            {TodoList.map((item) => (
              <li className="TodoItem" key={item.id}>
                <span>{item.name}</span>
                <div className="buttons">
                  <button onClick={() => handleEnableEdit(item.id)}>
                    <AiFillEdit />
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <AiTwotoneDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todo;