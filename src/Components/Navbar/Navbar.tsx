import React, { MouseEvent, useRef, RefObject, useEffect } from "react";

// ESTILOS
import "./Navbar.css";

// LIMITES
let count: number = 0;

// PROPIEDADES
interface Props extends Strings.application {
	getVal: Function;
	getFocus?: Function;
	defaultValue?: string;
}

const Navbar: React.FC<Props> = (props: Props) => {
	// INPUT DE BUSQUEDA
	const input: RefObject<HTMLInputElement> = useRef(null);

	// RETORNAR VALOR DEL INPUT
	const setVal = () => props.getVal(input.current?.value)

	// ENVIAR BUSQUEDA RAPIDA
	const shortVal = (event: MouseEvent<HTMLLIElement>) => {
		const li: HTMLLIElement = event.target as HTMLLIElement;
		if (li.textContent) {
			props.getVal(li.textContent.substr(6), true);
			if (input.current) input.current.value = li.textContent.substr(6);
		}
	}

	// ASIGNAR EL VALOR DEL PATH AL INPUT
	useEffect(() => {
		if (input.current && count === 0) {
			if (props.defaultValue) input.current.value = props.defaultValue;
			count++;
		}
	})

	return (
		<div className="navbar">
			<div id="navContent">
				<div id="headerText">
					<div id="headerContent">
						<h1>{props.title}</h1>
						<p>{props.text}</p>
					</div>
					<a href="https://github.com/alexsan-dev" title="linkToMyGithub" className="material-icons waves waves-dark">more_vert</a>
				</div>

				<div id="searchBox">
					<label className="material-icons" htmlFor="search">search</label>
					<input
						ref={input}
						type="search"
						id="search"
						name="search"
						placeholder={props.search}
						onChange={setVal}
					/>
				</div>

				<input type="checkbox" id="showList"></input>

				<label htmlFor="showList" id="showSearchList">
					<i className="material-icons">flash_on</i>{props.advancedSearch}
				</label>
				<label htmlFor="showList" id="search-list">
					<ul>
						{
							props.short.map((e: string, i: number) => (
								<li key={i} onClick={shortVal}>
									<i className="material-icons">styles</i>{e}
								</li>
							))
						}
					</ul>
				</label>
			</div>
		</div >
	)
}

export default Navbar;