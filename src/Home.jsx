import React, { useEffect, useState } from 'react'

// To get the Data from Local Storage
const getLocalItems = () => {
    let list = localStorage.getItem('lists');

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

function Home() {
    const [Task, setTask] = useState("");
    const [TodoList, setTodoList] = useState(getLocalItems());

    // To add Task to the TodoList
    const addTask = () => {
        const task = {
            id: TodoList.length === 0 ? 1 : TodoList[TodoList.length - 1].id + 1,
            task: Task,
            completed: false
        }

        if (task.task === "") {
            alert("Please Enter a Task");
        }
        else {
            setTodoList([...TodoList, task]);
        }
    }

    // To clear all the Tasks
    const clearTask = () => {
        setTask("");
        setTodoList([]);
        localStorage.clear();
    }

    // To delete the task
    const deleteTask = (id) => {
        setTodoList(TodoList.filter((task) => task.id !== id))
    }

    // To mark the completion of task
    const completeTask = (id) => {
        setTodoList(TodoList.map((task) => {
            if (task.id === id) {
                return { ...task, completed: true };
            }
            else {
                return task;
            }
        }))
    }


    // To store Item to the Local Storage
    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(TodoList));
    }, [TodoList])



    return (
        <div className='wrapper'>
            <h2 style={{ textDecoration: "underline" }}>Adding Tasks</h2>
            <div className="Task">
                <input type="text" style={{ padding: 15 }} placeholder='Enter the Task' onChange={(event) => setTask(event.target.value)} value={Task} />
                <button onClick={addTask}><i className="fa-solid fa-plus"></i></button>
                <button onClick={clearTask}><i className="fa-solid fa-trash-can"></i></button>
            </div>

            <ul className='list'>
                <h2 style={{ textDecoration: "underline" }}>Tasks</h2>
                {TodoList.map((item, key) => {
                    return (
                        <>
                        {/* Iterating the Items of the TodoList */}
                            <li key={key} style={{ color: item.completed ? "#7aeb34" : "white", textDecoration: item.completed ? "line-through" : "none" }} >{item.task}</li>
                            <div className='buttons'>
                                {/* Deleting the Task */}
                                <button onClick={() => deleteTask(item.id)}><i className="fa-regular fa-circle-xmark"></i></button>
                                {/* Marking the Task if it is complete */}
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