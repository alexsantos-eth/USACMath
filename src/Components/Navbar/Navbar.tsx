import React, { MouseEvent, useRef, RefObject, useEffect } from "react";

// ESTILOS
import "./Navbar.css";
import { changeTheme } from "../../Utils/hooks";

// LIMITES
let count: number = 0;

// PROPIEDADES
interface Props extends Strings.application {
	getVal: Function;
	getFocus?: Function;
	fText: string;
	defaultValue?: string;
}

// BUSQUEDA RAPIDA	
let quickList: JSX.Element[];

const Navbar: React.FC<Props> = (props: Props) => {
	// INPUT DE BUSQUEDA
	const input: RefObject<HTMLInputElement> = useRef(null);

	// RETORNAR VALOR DEL INPUT
	const setVal = () => props.getVal(input.current?.value.trim().toLowerCase())

	// ENVIAR BUSQUEDA RAPIDA
	const shortVal = (event: MouseEvent<HTMLLIElement>) => {
		const li: HTMLLIElement = event.target as HTMLLIElement;
		if (li.textContent) {
			props.getVal(li.textContent.substr(li.textContent.indexOf(" ") + 1).trim().toLowerCase(), true);
			if (input.current) input.current.value = li.textContent.substr(li.textContent.indexOf(" ") + 1);
		}
	}

	// CAMBIAR TEMA
	const switchTheme = () => {
		// CAMBIAR A MODO OSCURO
		if (window.localStorage.getItem("theme") === "light") {
			window.localStorage.setItem("theme", "dark");
			changeTheme()
		}

		// CAMBIAR A MODO CLARO
		else {
			window.localStorage.setItem("theme", "light");
			changeTheme()
		}
	}

	// ASIGNAR EL VALOR DEL PATH AL INPUT
	useEffect(() => {
		if (count === 0) {
			if (input.current) {
				if (props.defaultValue) input.current.value = props.defaultValue;
				count++;
			}

			// RENDERIZAR LAS PALABRAS FRECUENTES
			quickList = props.short.map((e: { icon: string; text: string }, i: number) => (
				<li key={i} onClick={shortVal}>
					<i className="material-icons">{e.icon}</i> {e.text}
				</li>
			))
		}
	})

	return (
		<div className="navbar">
			<div id="navContent">
				<div id="headerText">
					<div id="headerContent">
						<h1>{props.title}</h1>
						<p>{props.fText}</p>
					</div>
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
				<button className="material-icons darkMode" onClick={switchTheme}>brightness_medium</button>

				<label htmlFor="showList" id="search-list">
					<ul>
						<li>{props.listTitle}</li>
						{quickList}
					</ul>
				</label>
			</div>
		</div >
	)
}

export default Navbar;