import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { use } from "react";

//create your first component
const Home = () => {
	const [input, setInput] = useState("");
	const [list, setList] = useState([""]);
	

	const deleteLi = (index) => {
		const newtList = list.filter((item, i) => i != index);
		setList(newtList);
	}
      
	 const toDoUrl = "https://playground.4geeks.com/todo/users/idm";
	 const getToDos = () => {
	 	 fetch(toDoUrl)
		.then((rsp)=> rsp.json())
		.then((data)=> setList(data.todos))
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
								setList([...list, input, ]);
								setInput("");


							}
						}}
					/>
				</li>
				{list.length > 0 ? list.map(
					(item, index) => {
						return (
							<li onClick={() => deleteLi(index)} className="list-group-item">{item.label}</li>
						)
					}

				)
 : "There is no items"}

			</ul>
		</div>
	);

};

export default Home;