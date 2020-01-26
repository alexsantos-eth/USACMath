import React, { ChangeEvent } from "react";
// ESTILOS
import "./Navbar.css";

// PROPIEDADES
interface Props { title: string; text: string; search: string; getVal: Function }

const Navbar: React.FC<Props> = (props: Props) => {
	// RETORNAR VALOR DEL INPUT
	const setVal = (event: ChangeEvent<HTMLInputElement>) => props.getVal(event.target.value);

	return (
		<div className="navbar">
			<div id="navContent">
				<ul>
					<li>
						<h1>{props.title}</h1>
						<p>{props.text}</p>
					</li>
					<li><a href="https://github.com/alexsan-dev" title="linkToMyGithub" className="material-icons waves waves-dark">more_vert</a></li>
				</ul>
				<div id="searchBox">
					<label className="material-icons" htmlFor="search">search</label>
					<input type="search" id="search" name="search" placeholder={props.search} onChange={setVal}></input>
				</div>
			</div>
		</div>
	)
}

export default Navbar;