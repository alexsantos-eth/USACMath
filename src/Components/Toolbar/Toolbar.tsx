import React, { MouseEvent, useEffect, useRef, RefObject, useState, Dispatch, SetStateAction } from "react";

// ESTILOS
import "./Toolbar.css";

// TIPOS
import { Link, useHistory } from 'react-router-dom';

// TEXTOS
import Strings from "../../Strings/strings.json";
import { asign, showAlert, fbLogin, gLogin, useLogin, logout } from "../../Utils/hooks";

// ICONOS
import G from "../../Assets/gicon.png";
import F from "../../Assets/ficon.png";

// ELEMENTO DE TOOLBAR Y SHADOW
let lisA: NodeListOf<HTMLElement>;

// EVENT HANDLER
let eventHandler = 0;

// VERSION MOVIL
const isDesktop = window.innerWidth > 500;

// HABILITAR LOGIN
let loginCount = 0;

const Toolbar: React.FC = () => {
  // ESTADO
  const [user, setUser]: [firebase.User | null | undefined, Dispatch<SetStateAction<firebase.User | null | undefined>>] = useState();

  //  DIRECCION LOCAL
  const pathname = useHistory().location.pathname;

  // REFERENCIAS
  const toolbar: RefObject<HTMLUListElement> = useRef(null);
  const shadow: RefObject<HTMLDivElement> = useRef(null);
  const logsContainer: RefObject<HTMLDivElement> = useRef(null);

  // ACTUALIZAR ESTADO DE USUARIO
  useLogin((user: firebase.User | null) => {
    setUser(user);
    loginCount = 1;
    eventHandler = 0;
  }, (e: firebase.auth.Error) => console.log(e))

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

  const loginBox = () => {
    if (logsContainer.current) {
      // MOSTRAR BOTONES
      logsContainer.current.style.display = "block";

      // ASIGNAR ALERTA
      showAlert({
        title: Strings.login.title,
        body: Strings.login.text,
        type: "window",
        customElements: logsContainer.current
      })
    }
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
      case "login":
        if (loginCount !== 0) {
          if (!user)
            // MOSTRAR INICIO DE SESION
            loginBox();
          else
            // MOSTRAR ALERTA DE CERRAR SESION
            showAlert({
              title: Strings.login.logoutTitle,
              body: Strings.login.logoutText,
              type: "confirm",
              onConfirm: () => {
                logout();
              }
            })
        }
        break;
      default:
        break;
    }
  }

  // OCULTAR TOOLBAR
  const hidetool = () => {
    if (toolbar.current && shadow.current) {
      toolbar.current.style.transform = "translateX(-300px)";
      shadow.current.style.opacity = "0";
      setTimeout(() => {
        if (shadow.current) shadow.current.style.display = "none";
      }, 300);
    }
  }

  // MOSTRAR TOOLBAR
  const showtool = () => {
    if (toolbar.current && shadow.current) {
      toolbar.current.style.transform = "translateX(0px)";
      shadow.current.style.display = "block";
      setTimeout(() => {
        if (shadow.current) shadow.current.style.opacity = "1";
      }, 10);
    }
  }

  useEffect(() => {
    // ASIGNAR ELEMENTOS
    lisA = document.querySelectorAll("#toolbar > a > li") as NodeListOf<HTMLElement>;

    // TOOLTIPS
    if (eventHandler === 0) {
      const lis: NodeListOf<HTMLElement> = document.querySelectorAll("#toolbar > li") as NodeListOf<HTMLElement>;

      // AGREGAR TOOLTIP
      const addTooltip = (el: HTMLElement) => {
        // SELECCIONAR TOOLTIP
        const dataTooltip: string | null = el.getAttribute("data-tooltip");
        const span: HTMLSpanElement = document.createElement("span") as HTMLSpanElement;

        // ELIMINAR DUPLICADOS
        el.childNodes.forEach(e => {
          if (e.nodeName === "SPAN") el.removeChild(e);
        })

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
      <div id="toolbarShadow" onClick={hidetool} ref={shadow}></div>
      <ul id="toolbar" ref={toolbar}>
        {!isDesktop ? <>
          <h1>{Strings.application.toolbar.title}</h1>
          <p>{Strings.application.toolbar.text}</p>
        </> : ""
        }
        <li id="logBtn" onClick={selectMod} data-mod="login" data-tooltip={user ? "Cerrar sesión" : "Iniciar sesión"}>
          {user ?
            <img data-mod="login" src={user.photoURL || ""} alt="User pic" />
            :
            <i data-mod="login" className="material-icons">person</i>
          }
        </li>
        <Link to="/"><li onClick={selectMod} data-tooltip="Archivos"><i className="material-icons">style</i></li></Link>
        {/* <Link to="/horarios"><li onClick={selectMod} data-tooltip="Horarios"><i className="material-icons">event</i></li></Link>
        <li onClick={selectMod} data-mod="programas" data-tooltip="Programas"><i data-mod="programas" className="material-icons">assignment</i></li>
        <li onClick={selectMod} data-mod="olimpiada" data-tooltip="Olimpiada"><i data-mod="olimpiada" className="material-icons">all_inclusive</i></li>
        <li onClick={selectMod} data-mod="correo" data-tooltip="Contacto"><i data-mod="correo" className="material-icons">email</i></li>
        <li onClick={selectMod} data-mod="mainPage" data-tooltip="Departamento"><i data-mod="mainPage" className="material-icons">devices</i></li>
      */}
      </ul>
      <div id="logsContainer" ref={logsContainer}>
        <button className="flogin" onClick={fbLogin}><img src={F} alt="Login Icon F" />Iniciar con Facebook</button>
        <button className="glogin" onClick={gLogin}><img src={G} alt="Login Icon G" />Iniciar con Google</button>
      </div>
    </>
  )
}

export default Toolbar;