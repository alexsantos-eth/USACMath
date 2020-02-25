import React, { MouseEvent, useEffect } from "react";

// ESTILOS
import "./Toolbar.css";

// TIPOS
import { Link, useHistory } from 'react-router-dom';

// TEXTOS
import Strings from "../../Strings/strings.json";
import { asign } from "../../Utils/hooks";

// ELEMENTO DE TOOLBAR Y SHADOW
let toolbar: HTMLDivElement;
let shadow: HTMLDivElement;
let lisA: NodeListOf<HTMLElement>;

// EVENT HANDLER
let eventHandler = 0;

// VERSION MOVIL
const isDesktop = window.innerWidth > 500;

const Toolbar: React.FC = () => {
  const pathname = useHistory().location.pathname;

  // VER CAMBIOS EN LAS RUTAS
  useHistory().listen(listen => {
    selectRoute(listen.pathname);

    // RESETEAR VARIABLES GLOBALES
    asign(0, 0);
    asign(0, 2);
    asign(0, 4);
    asign(0, 6);
  })

  // SELECCIONAR RUTA ACTIVA
  const selectRoute = (path: string) => {
    if (lisA) lisA.forEach((el: HTMLElement) => {
      // SELECCIONAR DATOS DEL TOOLTIP COMO RUTA
      const data = el.getAttribute("data-tooltip")
      el.classList.remove("pathActive");

      // SI ES LA RUTA DE HOME AGREGAR TAMBIEN PARA /BUSCAR
      if ((path.indexOf("/buscar") >= 0 || path === "/") && data === "Archivos")
        el.classList.add("pathActive");

      // SINO SE ASIGNA COMO ACTIVA SI LA RUTA ES EL TOOLTIP
      else if (data && path.indexOf(data.toLowerCase()) > 0)
        el.classList.add("pathActive");

    })
  }

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
    toolbar.style.transform = "translateX(-300px)";
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

  useEffect(() => {
    // ASIGNAR ELEMENTOS
    toolbar = document.getElementById("toolbar") as HTMLDivElement;
    shadow = document.getElementById("toolbarShadow") as HTMLDivElement;
    lisA = document.querySelectorAll("#toolbar > a > li") as NodeListOf<HTMLElement>;

    // TOOLTIPS
    if (eventHandler === 0) {
      const lis: NodeListOf<HTMLElement> = document.querySelectorAll("#toolbar > li") as NodeListOf<HTMLElement>;

      // AGREGAR TOOLTIP
      const addTooltip = (el: HTMLElement) => {
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

      }

      // AGREGAR A LOS BOTONES Y LINKS
      lis.forEach(addTooltip);
      lisA.forEach(addTooltip);
    }

    // LIMITAR EVENTOS
    eventHandler++;

    // ASIGNAR RUTA ACTUAL
    selectRoute(pathname);
  })

  return (
    <>
      <button id="showToolbar" onClick={showtool}><i className="material-icons">more_vert</i></button>
      <div id="toolbarShadow" onClick={hidetool}></div>
      <ul id="toolbar">
        {!isDesktop ? <>
          <h1>{Strings.application.toolbar.title}</h1>
          <p>{Strings.application.toolbar.text}</p>
        </> : ""
        }
        <Link to="/"><li onClick={selectMod} data-tooltip="Archivos"><i className="material-icons">style</i></li></Link>
        <Link to="/horarios"><li onClick={selectMod} data-tooltip="Horarios"><i className="material-icons">event</i></li></Link>
        <li onClick={selectMod} data-mod="programas" data-tooltip="Programas"><i data-mod="programas" className="material-icons">assignment</i></li>
        <li onClick={selectMod} data-mod="olimpiada" data-tooltip="Olimpiada"><i data-mod="olimpiada" className="material-icons">all_inclusive</i></li>
        <li onClick={selectMod} data-mod="correo" data-tooltip="Contacto"><i data-mod="correo" className="material-icons">email</i></li>
        <li onClick={selectMod} data-mod="mainPage" data-tooltip="Departamento"><i data-mod="mainPage" className="material-icons">devices</i></li>
      </ul>
    </>
  )
}

export default Toolbar;