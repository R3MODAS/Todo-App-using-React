import React, { useState } from 'react'

function Home() {
    const [Task, setNewTask] = useState("");
    const [TodoList, setTodoList] = useState([]);

    const handleChange = (event) => {
        setNewTask(event.target.value);
    }

    const addTask = () => {
        const task = {
            id: TodoList.length === 0 ? 1 : TodoList[TodoList.length - 1].id + 1,
            task: Task,
            completed: false
        }

        task.task === "" ? alert("Please Enter a Task") : setTodoList([...TodoList, task]);

    }

    const clearTask = () => {
        setNewTask("");
        setTodoList([]);
    }

    const deleteTask = (id) => {
        setTodoList(TodoList.filter((item) => item.id !== id));
        setNewTask("");
    }

    const completeTask = (id) => {
        setTodoList(
            TodoList.map((item) => {
                if (item.id === id) {
                    return { ...item, completed: true }
                }
                else {
                    return item;
                }
            })
        )

    }


    return (
        <div className='wrapper'>
            <h2 style={{ textDecoration: "underline" }}>Adding Tasks</h2>
            <div className="Task">
                <input type="text" style={{ padding: 15 }} placeholder='Enter the Task' onChange={handleChange} value={Task} />
                <button onClick={addTask}><i className="fa-solid fa-plus"></i></button>
                <button onClick={clearTask}><i className="fa-solid fa-trash-can"></i></button>
            </div>

            <ul className='list'>
                <h2 style={{ textDecoration: "underline" }}>Tasks</h2>
                {TodoList.map((item, key) => {
                    return (
                        <>
                            <li key={key} style={{ color: item.completed ? "#7aeb34" : "white", textDecoration: item.completed ? "line-through" : "none" }} >{item.task}</li>
                            <div className='buttons'>
                                <button onClick={() => deleteTask(item.id)}><i className="fa-regular fa-circle-xmark"></i></button>
                                <button onClick={() => completeTask(item.id)}><i className="fa-solid fa-check"></i></button>
                            </div>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home