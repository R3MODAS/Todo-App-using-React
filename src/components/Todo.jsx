import { useEffect, useState } from "react";
import {
  AiOutlinePlusCircle,
  AiTwotoneDelete,
  AiFillEdit,
} from "react-icons/ai";
import { BsTrash3Fill } from "react-icons/bs";
import { RiEditCircleLine } from "react-icons/ri";

function Todo() {

  // To Get the Data from localStorage
  const getLocalData = () => {
    const todolist = localStorage.getItem("todolist");
    if (todolist) {
      return JSON.parse(todolist);
    } else {
      return [];
    }
  }

  const [TodoList, setTodoList] = useState(getLocalData());
  const [InputTask, setInputTask] = useState("");
  const [ToggleBtn, setToggleBtn] = useState(true);
  const [EditItem, setEditItem] = useState(null);

  // Add Task to the TodoList
  const handleAdd = (event) => {
    event.preventDefault();
    const Task = {
      id: Date.now(),
      name: InputTask,
    };
    if (!InputTask) {
      alert("Please Fill the Data");
    }
    else if (InputTask && !ToggleBtn) {
      const editTask = TodoList.map((elem) => {
        if (elem.id === EditItem) {
          return { ...elem, name: InputTask }
        }
        return elem;
      })
      setTodoList(editTask);
      setToggleBtn(true);
      setEditItem(null);
      setInputTask("");
    }
    else {
      setTodoList([...TodoList, Task]);
      setInputTask("");
    }
  };

  // Deletes the Task
  const handleDelete = (id) => {
    const deleteTask = TodoList.filter((elem) => elem.id !== id)
    setTodoList(deleteTask)
  };

  // Clears all the Data
  const handleClear = () => {
    setTodoList([])
  };

  // Handle Edit Task
  const handleEdit = (id) => {
    const itemtoFind = TodoList.find((elem) => elem.id === id);
    setToggleBtn(false);
    setInputTask(itemtoFind.name);
    setEditItem(id);
  };

  // Add Data to the localStorage
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(TodoList));
  }, [TodoList]);

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
              <button type="submit" onClick={handleAdd} title="Edit Task">
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
                  <button onClick={() => handleEdit(item.id)}>
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
