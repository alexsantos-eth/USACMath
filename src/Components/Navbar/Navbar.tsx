import React from "react";
// ESTILOS
import "./Navbar.css";

interface Props{ title:string; text:string; search:string;}
const Navbar:React.FC<Props> = (props:Props) =>{
    return(
        <div className="navbar">
            <ul>
                <li>
                    <h1>{props.title}</h1>
                    <p>{props.text}</p>
                </li>
                <li><i className="material-icons">more_vert</i></li>
            </ul>
            <div id="searchBox">
                <label className="material-icons" htmlFor="search">search</label>
                <input type="search" id="search" name="search" placeholder={props.search}></input>
            </div>
        </div>
    )
}

export default Navbar;