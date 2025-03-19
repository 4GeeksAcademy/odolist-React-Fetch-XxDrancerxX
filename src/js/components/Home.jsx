import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [input, setInput] = useState("");
    const [list, setList] = useState([""]);

    const toDoUrl = "https://playground.4geeks.com/todo/";

    const deleteLi = (index) => {
        const newList = list.filter((item, i) => i !== index);
        setList(newList);
        // updateToDos(newList);
    }



    const getToDos = () => {
        fetch(toDoUrl + "users/idm")
            .then((resp) => resp.json())
            .then((data) => setList(data.todos))

    }
    const addTodo = (input) => {
        const options = {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch(toDoUrl + "users/idm", options)
            .then((resp) => resp.json())
            .then((data) => data)


    }

    useEffect(() => {

        getToDos()

    }
        , [])



    return (
        <div className="container d-flex justify-content-center hv-100 ">
            <ul className="list-group">
                <li className="list-group-item active" aria-current="true">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            console.log("Key pressed:", e.key);
                            const todoObj = {
                                "label": input,
                                "is_done": true
                            }
                            console.log("Adding todo:", todoObj);
                             addTodo(todoObj) 
                            if (e.key === "Enter") {
                                setList([...list, todoObj]);
                               
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
                ) : "There is no Todos"}
            </ul>
            <button className="btn btn-danger mt-3">Clean All Tasks</button>
        </div>
    );
};

export default Home;

