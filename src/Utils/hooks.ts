// DEXIE
import Dexie from "dexie";

// FIREBASE
import firebase from "../Keys/firebase";
import "firebase/database";
import "firebase/messaging";
import "firebase/auth";

// BASE DE DATOS FIREBASE
const db = firebase.database();
const ref = db.ref("data");
const commentsRef = db.ref("comments");
const tokens = db.ref("tokens");
const messaging = firebase.messaging();

// FIREBASE CLOUD MESSAGING
messaging.usePublicVapidKey("BDRrwiV-l2TelBZMRvyTUJRe6MH984nEr473aLIQYsV9Sv7NnazLm78PwZ8fWKwz0WQQN5KANeMc95Lz3ripXJw");

export { messaging }

// BASE DE DATOS LOCAL
interface localData {
  id: number;
  list: Idata[];
}

interface localComments {
  id: number;
  comments: IComments[];
}

export class localDB extends Dexie {
  // DECLARAR TABLAS
  list: Dexie.Table<localData, number>;
  comments: Dexie.Table<localComments, number>;

  constructor() {
    super("localDB");
    this.version(1).stores({ list: "id, list", comments: "id, comments" });
    this.list = this.table("list");
    this.comments = this.table("comments");
  }
}

// INSTANCIA DE LA BASE LOCAL
const localdb = new localDB();

// ENVIAR TOKEN A LA DB
export const sendToken = (token: string, onComplete: ((a: Error | null) => any)) => tokens.push(token, onComplete);

// EMVIAR UN COMENTARIO
export const addComment = async (data: IComments, index: number, onComplete?: (a: Error | null) => any) => {
  const commentsRefs = db.ref(`comments/${index}`);
  commentsRefs.set(data, onComplete)
}

// HOOK PARA OBTENER DATOS
export const getData = async (onDataUpdate: Function) => {
  // OBTENER DATOS LOCALES
  const data: localData[] = await localdb.list.toArray();
  const comments: localComments[] = await localdb.comments.toArray();

  // VERIFICAR POR NUEVOS DATOS 
  setTimeout(() => {
    const connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        ref.on("value", (dataS: firebase.database.DataSnapshot) => {
          // SI EXISTE UNA NUEVA VERSION DE LOS ARCHIVOS, ACTUALIZAR
          if (data[0] && navigator.onLine && JSON.stringify(dataS.val().reverse()) !== JSON.stringify(data[0].list)) {
            localdb.list.put({ id: 1, list: dataS.val().reverse() })
              .then(() => onDataUpdate(true))
          }
        })

        commentsRef.on("value", (dataS: firebase.database.DataSnapshot) => {
          // SI EXISTE UNA NUEVA VERSION DE LOS ARCHIVOS, ACTUALIZAR
          if (comments[0] && navigator.onLine && JSON.stringify(dataS.val()) !== JSON.stringify(comments[0].comments)) {
            localdb.comments.put({ id: 1, comments: dataS.val() })
          }
        })

      } else console.log("Error en la conexión a internet, no se pueden acceder a las actualizaciones.");
    });
  }, 1000);

  if (data[0] && comments[0]) {
    // LEER DATOS DEL LOCAL SI EXISTE
    console.log("Read data from localDB");
    return {
      data: data[0].list,
      comments: comments[0].comments
    }
  } else {
    // SINO LEER DE FIREBASE "SOLO UNA VEZ"
    console.log("Read data from Firebase");
    // ARCHIVOS
    const fb: firebase.database.DataSnapshot = await ref.once("value");
    const fbData: Idata[] = fb.val();

    // COMENTARIOS
    const fbComments: firebase.database.DataSnapshot = await commentsRef.once("value");
    const fbDataComments: IComments[] = fbComments.val();

    await localdb.list.put({ id: 1, list: fbData.reverse() });
    await localdb.comments.put({ id: 1, comments: fbDataComments });

    // APAGAR CONEXION
    ref.off();
    return {
      data: fbData,
      comments: fbDataComments
    };
  }
}

// PROVEEDORES DE INICIO DE SESION
let fbProvider: firebase.auth.AuthProvider;
let gProvider: firebase.auth.AuthProvider;

// AGREGAR PROVEEDORES
export const setProviders = () => {
  fbProvider = new firebase.auth.FacebookAuthProvider();
  gProvider = new firebase.auth.GoogleAuthProvider();
}

// INICIAR SESION CON FACEBOOK
export const fbLogin = () => firebase.auth().signInWithRedirect(fbProvider);

// INICIAR SESION CON GOOGLE
export const gLogin = () => firebase.auth().signInWithRedirect(gProvider);

// VER CAMVIOS DE USUARIO
export const useLogin = (callback: (user: firebase.User | null) => any, err: (a: firebase.auth.Error) => any) => firebase.auth().onAuthStateChanged(callback, err);

// CERRAR SESION
export const logout = () => firebase.auth().signOut();

// CAMBIAR VARIABLES GLOBALES
export const asign = (value: number, index: number) => {
  const vars = window.localStorage.getItem("limiters");
  if (vars) window.localStorage.setItem("limiters", vars.substr(0, index) + value + vars.substr(index + 1));
}

export const getScope = (index: number) => parseInt(window.localStorage.getItem("limiters")?.charAt(index) || "")

// EFECTO RIPPLE PARA TODOS LOS BOTONES
export const useRipples = () => {

  // OBTENER TODAS LAS SUPERFICIES
  const surface: NodeListOf<HTMLElement> | null = document.querySelectorAll(".waves") as NodeListOf<HTMLElement>;

  // FUNCION DE EFECTO
  function ripple(el: HTMLElement, e: MouseEvent) {
    if (el && surface) {
      // PROPIEDADES INICALES DEL CIRCULO
      const circle: HTMLDivElement = document.createElement("div") as HTMLDivElement;
      const maxLarge: number = Math.max(el.clientWidth, el.clientHeight);
      const rectSurface: ClientRect = el.getBoundingClientRect();

      // FUNCION LOGARITMICA DEL TIEMPO
      const time: number = Math.log(maxLarge) / Math.log(Math.exp(1)) / 11;

      // APLICAR DIMENSIONES Y ESTILO AL CIRCULO
      circle.style.width = circle.style.height = maxLarge + "px";
      circle.style.left = e.clientX - rectSurface.left - maxLarge / 2 + "px";
      circle.style.top = e.clientY - rectSurface.top - maxLarge / 2 + "px";
      circle.classList.add("ripple");
      circle.style.animation = `ripple ${time}s ease-in`;

      // AGREGAR CIRCULO A DIVS CON LA CLASE WAVES-DARK
      if (el.classList.contains("waves-dark"))
        circle.classList.add("ripple-dark");
      el.appendChild(circle);

      // ELIMINAR CIRCULO LUEGO DE *TIME* SEGUNDOS
      setTimeout(() => {
        try { el.removeChild(circle) }
        catch { }
      }, time * 1000);
    }
  }

  // AGREGAR FUNCION RIPPLE A TODAS LAS SUPERFICIES Y VERIFICAR SI YA SE AGREGO ANTES
  for (let i = 0; i < surface.length; i++) {
    if (!surface[i].getAttribute("data-ripple")) {
      surface[i].setAttribute("data-ripple", "true");
      surface[i].addEventListener("click", (e: MouseEvent) => ripple(surface[i], e));
    }
  }
};

// MOSTRAR TOAST
export const showToast = (data: IToast) => {
  let allToast: NodeListOf<HTMLDivElement> = document.querySelectorAll(".toast") as NodeListOf<HTMLDivElement>;
  let div: HTMLDivElement = document.createElement("div") as HTMLDivElement;
  let span: HTMLDivElement = document.createElement("span") as HTMLDivElement;
  let btn: HTMLButtonElement = document.createElement("button") as HTMLButtonElement;

  // LIMPIAR TODOS LOS TOAST ANTERIORES
  allToast.forEach((el: HTMLDivElement) => document.body.removeChild(el));

  // AGREGAR CLASE 
  div.classList.add("toast");
  if (data.actionText) div.classList.add("actionToast");

  // AGREGAR TEXTOS Y ACCIONES
  span.textContent = data.text;
  btn.textContent = data.actionText || "";

  // EVENTO DE CLICK EN EL BOTON ACCION
  btn.addEventListener("click", (e: MouseEvent) => {
    if (data.action) data.action(e);
    div.style.transform = "translateY(100%)";
    setTimeout(() => {
      try {
        document.body.removeChild(div);
      } catch (e) { }
      if (data.onHide) data.onHide();
    }, 5300);
  });

  // AGREGAR DIV AL BODY
  div.appendChild(span);
  if (data.actionText) div.appendChild(btn);
  document.body.appendChild(div);

  // ANIMAR HACIA ARRIBA
  setTimeout(() => {
    div.style.transform = "translateY(0)";
  }, 10)

  // NO ELIMINAR SI ES UN MENSAJE FIJO
  if (!data.fixed) {
    setTimeout(() => {
      div.style.transform = "translateY(100%)";
    }, 5000);

    setTimeout(() => {
      try {
        document.body.removeChild(div);
      } catch (e) { }
      if (data.onHide) data.onHide();
    }, 5300);
  }
}

// MOSTRAR ALERTAS
interface AlertProps {
  type: "confirm" | "alert" | "error" | "window";
  onHide?: Function;
  onConfirm?: Function;
  title: string;
  body: string;
  confirmBtn?: string;
  cancelBtn?: string;
  customElements?: Node;
}

export const showAlert = (props: AlertProps) => {
  // CREAR ELEMENTOS
  const alertContainer: HTMLDivElement = document.createElement("div");
  const alertShadow: HTMLDivElement = document.createElement("div");
  const alertContent: HTMLDivElement = document.createElement("div");
  const actions: HTMLUListElement = document.createElement("ul");
  const liCancel: HTMLLIElement = document.createElement("li");
  const liConfirm: HTMLLIElement = document.createElement("li");
  const h1: HTMLHeadingElement = document.createElement("h1");
  const p: HTMLParagraphElement = document.createElement("p");
  const cancelBtn: HTMLButtonElement = document.createElement("button");
  const confirmBtn: HTMLButtonElement = document.createElement("button");

  // ASIGNAR CLASES
  alertContainer.classList.add("alertContainer");
  alertShadow.classList.add("alertShadow");
  alertContent.classList.add("alertContent");
  cancelBtn.classList.add("cancelBtn", "waves", "waves-dark");
  confirmBtn.classList.add("confirmBtn", "waves");

  // ASIGNAR TEXTOS
  h1.textContent = props.title;
  p.textContent = props.body;
  cancelBtn.textContent = props.cancelBtn || "Cancelar";
  confirmBtn.textContent = props.confirmBtn || "Aceptar";

  // ASIGNAR EVENTOS
  const hideAlert = () => {
    alertContainer.style.opacity = "0";
    setTimeout(() => {
      try {
        document.body.removeChild(alertContainer);
        if (props.onHide) props.onHide();
      } catch (err) { }
    }, 400);
  }

  alertShadow.addEventListener("click", hideAlert);
  cancelBtn.addEventListener("click", hideAlert);
  confirmBtn.addEventListener("click", () => {
    if (props.onConfirm) props.onConfirm();
    hideAlert();
  });

  if (props.type === "confirm") cancelBtn.style.display = "block";
  if (props.type === "window") confirmBtn.style.display = "none";

  // ASIGNAR AL DOM
  liConfirm.appendChild(confirmBtn);
  liCancel.appendChild(cancelBtn);
  actions.appendChild(liCancel);
  actions.appendChild(liConfirm);
  alertContent.appendChild(h1);
  alertContent.appendChild(p);
  if (props.customElements) alertContent.appendChild(props.customElements);
  alertContent.appendChild(actions);
  alertContainer.appendChild(alertShadow);
  alertContainer.appendChild(alertContent);
  document.body.appendChild(alertContainer);
}

// CAMBIAR COLORES
interface changeColors {
  white: string | null;
  primary: string;
  dark: string | null;
  filesHead: string | null;
  files: string | null;
  back: string;
}

const changeColors = (props: changeColors) => {
  const metaThemeColor = document.querySelector("meta[name=theme-color]");
  const b = document.body;
  b.style.setProperty("--white", props.white)
  b.style.setProperty("--primary", props.primary)
  b.style.setProperty("--dark", props.dark)
  b.style.setProperty("--files", props.files)
  b.style.backgroundColor = props.back;
  b.style.setProperty("--filesHead", props.filesHead)

  if (metaThemeColor) metaThemeColor.setAttribute("content", props.primary);
}

// CAMBIAR TEMA
export const changeTheme = () => {
  if (window.localStorage.getItem("theme") === "light") {
    changeColors({
      primary: "#455a64",
      white: "#fff",
      dark: "#263238",
      files: "#555",
      filesHead: "#fff",
      back: "#aaa"
    })
  } else {
    changeColors({
      primary: "#607d8b",
      white: "#fff",
      dark: "#455a64",
      files: "#fff",
      filesHead: "rgba(0, 0, 0, .8)",
      back: "#eee"
    })
  }
}

