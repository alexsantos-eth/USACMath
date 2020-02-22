// DEXIE
import Dexie from "dexie";

// FIREBASE
import firebase from "../Keys/firebase";
import "firebase/database";
import "firebase/messaging";

// BASE DE DATOS FIREBASE
const db = firebase.database();
const ref = db.ref("data");
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

export class localDB extends Dexie {
  // DECLARAR TABLAS
  list: Dexie.Table<localData, number>;

  constructor() {
    super("localDB");
    this.version(1).stores({ list: "id, list" });
    this.list = this.table("list");
  }
}

// INSTANCIA DE LA BASE LOCAL
const localdb = new localDB();

// ENVIAR TOKEN A LA DB
export const sendToken = (token: string, onComplete: ((a: Error | null) => any)) => tokens.push(token, onComplete);

// HOOK PARA OBTENER DATOS
export const getData = async (onDataUpdate: Function) => {
  // OBTENER DATOS LOCALES
  const data: localData[] = await localdb.list.toArray();

  // VERIFICAR POR NUEVOS DATOS 
  setTimeout(() => {
    ref.on("value", (dataS: firebase.database.DataSnapshot) => {

      // SI EXISTE UNA NUEVA VERSION DE LOS ARCHIVOS, ACTUALIZAR
      if (data[0] && navigator.onLine && JSON.stringify(dataS.val().reverse()) !== JSON.stringify(data[0].list)) {
        localdb.list.put({ id: 1, list: dataS.val().reverse() })
          .then(() => onDataUpdate(true))
      }
    })
  }, 3000);

  if (data[0]) {
    // LEER DATOS DEL LOCAL SI EXISTE
    console.log("Read data from localDB");
    return data[0].list;
  } else {
    // SINO LEER DE FIREBASE "SOLO UNA VEZ"
    console.log("Read data from Firebase");
    const fb: firebase.database.DataSnapshot = await ref.once("value");
    const fbData: Idata[] = fb.val();
    await localdb.list.put({ id: 1, list: fbData.reverse() });
    ref.off();
    return fbData;
  }
}

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
      } catch{ }
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
      document.body.removeChild(div);
      if (data.onHide) data.onHide();
    }, 5300);
  }
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