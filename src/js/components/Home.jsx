import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);

    const toDoUrl = "https://playground.4geeks.com/todo/";

    const deleteLi = (index) => {
        console.log("Deleting todo at index:", index);
        const newList = list.filter((item, i) => i !== index);
        setList(newList);
        console.log("Updated list after deletion:", newList);
        updateToDos(newList);
    }

    const createUser = () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(toDoUrl + "users/idm", options)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                return resp.json();
            })
            .then((data) => {
                console.log("User created:", data)
                getToDos()
            })
            .catch((error) => console.error("Error creating user:", error));




    }

    const getToDos = () => {
        fetch(toDoUrl + "users/idm")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Fetched todos:", data.todos);
                setList(data.todos);
            })
            .catch((error) => console.error("Error fetching todos:", error));
    }

    const updateToDos = (newList) => {
        newList.forEach(todo => {
            const options = {
                method: "PUT",
                body: JSON.stringify(todo),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            console.log("Payload being updated:", options.body);
            fetch(`${toDoUrl}todos/${todo.id}`, options)
                .then((resp) => resp.json())
                .then((data) => console.log("Todo updated:", data))
                .catch((error) => console.error("Error updating todo:", error));
        });
    }

    const addTodo = (input) => {
        const options = {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            }
        };
        console.log("Payload being sent:", options.body);
        fetch(toDoUrl + "todos/idm", options)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Todo added:", data);
                const newList = [...list, data];
                setList(newList);
                updateToDos(newList);
            })
            .catch((error) => console.error("Error adding todo:", error));
    }

    const cleanAllTasks = () => {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        console.log("Sending DELETE request to:", toDoUrl + "users/idm");
        fetch(toDoUrl + "users/idm", options)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                return resp.text(); // Handle non-JSON response
            })
            .then(() => {
                console.log("All tasks deleted");
                setList([]);
                createUser();
            })
            .catch((error) => console.error("Error cleaning all tasks:", error));
    }

    useEffect(() => {
        getToDos();
    }, []);

    return (
        <div className="container d-flex justify-content-center hv-100 ">
            <ul className="list-group">
                <li className="list-group-item active" aria-current="true">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {
                                const todoObj = {
                                    "label": input,
                                    "is_done": true
                                };
                                console.log("Adding todo:", todoObj);
                                console.log("Key pressed:", e.key);
                                addTodo(todoObj);
                                setInput("");
                            }
                        }}
                    />
                </li>
                {list.length > 0 ? list.map(
                    (item, index) => {
                        return (
                            <li key={index} onClick={() => deleteLi(index)} className="list-group-item">{item.label}</li>
                        )
                    }
                ) : "There are no Todos"}
            </ul>
            <button onClick={cleanAllTasks} className="btn btn-danger mt-3">Clean All Tasks</button>
        </div>
    );
};

export default Home;