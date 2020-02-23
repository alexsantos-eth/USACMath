import React, { MouseEvent, useEffect } from "react";

// ESTILOS
import "./Toolbar.css";

// TEXTOS
import Strings from "../../Strings/strings.json";

// ELEMENTO DE TOOLBAR Y SHADOW
let toolbar: HTMLDivElement;
let shadow: HTMLDivElement;

// EVENT HANDLER
let eventHandler = 0;

// VERSION MOVIL
const isDesktop = window.innerWidth > 500;

const Toolbar: React.FC = () => {
  // SELECCIONAR OPCION DEL TOOLBAR
  const selectMod = (e: MouseEvent) => {
    // OCULTAR TOOLBAR EN PANTALLA MENOR A 500
    if (!isDesktop) hidetool();

    // ELEMENTO DE LA FUNCION
    const el: HTMLElement = e.target as HTMLElement;

    // VALIDAR TEXTO DE LA FUNCION
    switch (el.getAttribute("data-mod")) {
      case "mainPage":
        // ABRIR PAGINA DEL DEPARTAMENTO
        window.open("http://mate.ingenieria.usac.edu.gt/", "_blank")
        break;
      default:
        break;
    }
  }

  // OCULTAR TOOLBAR
  const hidetool = () => {
    toolbar.style.transform = "translateX(-250px)";
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

    // TOOLTIPS
    if (eventHandler === 0) {
      const lis: NodeListOf<HTMLElement> = document.querySelectorAll("#toolbar > li") as NodeListOf<HTMLElement>;
      lis.forEach((el: HTMLElement) => {
        const dataTooltip: string | null = el.getAttribute("data-tooltip");
        const span: HTMLSpanElement = document.createElement("span") as HTMLSpanElement;

        // ASIGNAR TEXTO AL SPAN
        span.textContent = dataTooltip;
        span.setAttribute("data-mod", el.getAttribute("data-mod") || "");
        if (isDesktop) span.classList.add("desktopTooltip");
        else span.classList.add("normalTooltip");

        // ASIGNAR SPAN
        el.appendChild(span)

        // ASIGNAR EVENTOS
        if (isDesktop) {
          el.addEventListener("mouseover", () => span.style.opacity = "1");
          el.addEventListener("mouseout", () => span.style.opacity = "0");
        }

      })
    }

    // LIMITAR EVENTOS
    eventHandler++;
  })

  return (
    <>
      <button id="showToolbar" onClick={showtool}><i className="material-icons">more_vert</i></button>
      <div id="toolbarShadow" onClick={hidetool}></div>
      <ul id="toolbar">
        {!isDesktop ? <>
          <h1>{Strings.application.toolbarTitle}</h1>
          <p>{Strings.application.toolbarText}</p>
        </> : ""
        }
        <li onClick={selectMod} data-mod="mainPage" data-tooltip="Departamento"><i data-mod="mainPage" className="material-icons">devices</i></li>
        <li onClick={selectMod} data-mod="horarios" data-tooltip="Horarios"><i data-mod="horarios" className="material-icons">event</i></li>
        <li onClick={selectMod} data-mod="programas" data-tooltip="Programas"><i data-mod="programas" className="material-icons">assignment</i></li>
        <li onClick={selectMod} data-mod="olimpiada" data-tooltip="Olimpiada"><i data-mod="olimpiada" className="material-icons">all_inclusive</i></li>
        <li onClick={selectMod} data-mod="correo" data-tooltip="Contacto"><i data-mod="correo" className="material-icons">email</i></li>
      </ul>
    </>
  )
}

export default Toolbar;