import React, { MouseEvent, useEffect } from "react";

// ESTILOS
import "./Toolbar.css";
import { changeTheme } from "../../Utils/hooks";

// ELEMENTO DE TOOLBAR Y SHADOW
let toolbar: HTMLDivElement;
let shadow: HTMLDivElement;

const Toolbar: React.FC = () => {
  // SELECCIONAR OPCION DEL TOOLBAR
  const selectMod = (e: MouseEvent) => {
    // OCULTAR TOOLBAR EN PANTALLA MENOR A 500
    if (window.innerWidth < 500) hidetool();

    // ELEMENTO DE LA FUNCION
    const el: HTMLElement = e.target as HTMLElement;

    // VALIDAR TEXTO DE LA FUNCION
    switch (el.getAttribute("data-mod")) {
      case "mainPage":
        // ABRIR PAGINA DEL DEPARTAMENTO
        window.open("http://mate.ingenieria.usac.edu.gt/", "_blank")
        break;
      case "darkmode":
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
        break;
      default:
        break;
    }
  }

  // OCULTAR TOOLBAR
  const hidetool = () => {
    toolbar.style.transform = "translateX(-70px)";
    shadow.style.opacity = "0";
    setTimeout(() => {
      shadow.style.display = "none";
    }, 300);
  }

  // MOSTRAR TOOLBAR
  const showtool = () => {
    toolbar.style.transform = "translateX(0px)";
    shadow.style.display = "block";
    setTimeout(() => {
      shadow.style.opacity = "1";
    }, 10);
  }

  // ASIGNAR ELEMENTOS
  useEffect(() => {
    toolbar = document.getElementById("toolbar") as HTMLDivElement;
    shadow = document.getElementById("toolbarShadow") as HTMLDivElement;
  })

  return (
    <>
      <button id="showToolbar" onClick={showtool}><i className="material-icons">more_vert</i></button>
      <div id="toolbarShadow" onClick={hidetool}></div>
      <ul id="toolbar">
        <li onClick={selectMod} data-mod="mainPage"><i data-mod="mainPage" className="material-icons">devices</i></li>
        <li onClick={selectMod} data-mod="darkmode"><i data-mod="darkmode" className="material-icons">brightness_medium</i></li>
        <li onClick={selectMod} data-mod="horarios"><i data-mod="horarios" className="material-icons">event</i></li>
        <li onClick={selectMod} data-mod="programas"><i data-mod="programas" className="material-icons">assignment</i></li>
        <li onClick={selectMod} data-mod="olimpiada"><i data-mod="olimpiada" className="material-icons">all_inclusive</i></li>
        <li onClick={selectMod} data-mod="correo"><i data-mod="correo" className="material-icons">email</i></li>
      </ul>
    </>
  )
}

export default Toolbar;