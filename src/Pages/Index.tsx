// ESTILOS Y FIREBASE
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import firebase from "../Keys/firebase";
import "firebase/database";
import './Index.css';

// COMPONENTES 
import Navbar from "../Components/Navbar/Navbar";
import Files from "../Components/Files/Files";
import Preloader from "../Components/Preloader/Preloader";
import Toast from "../Components/Toast/Toast"
import Spinner from "../Components/Spinner/Spinner";

// TEXTOS
import Strings from "../Strings/strings.json";

// COPIAR TEXTO
import copy from 'copy-to-clipboard';

// ICONOS Y EFECTOS
import { useRipples } from '../Utils/hooks';
import { FixedSizeList as List } from 'react-window';

// BASE DE DATOS FIREBASE
const db = firebase.database();
const ref = db.ref("data");

// HOOK PARA OBTENER DATOS
const getData = (callback: Function) => ref.once("value", (data: firebase.database.DataSnapshot) => callback(data))

// DATOS RESULTANTES
const defData: Idata = { course: "", link: "", title: "", text: "", type: "", upload: "" };

// MOSTRAR TEXTO AL COMPARTIR
let showToasts = () => { };

// FUNCTION PARA PREVIUSALIZAR
let showPreview = (str: string) => { };

// LIMITAR LECTURAS Y DATOS
let count: number = 0;
let closeCount: number = 0;
let cData: Idata[];
let copyD: Idata[];

interface State { data: Idata[]; showMore?: boolean; preview?: string }

// ANIMAR HACIA ARRIBA
const scrollTop = () => window.scrollTo({
  behavior: "smooth",
  left: 0,
  top: 0
});

// LIMITAR SHARE API
let shareCount: number = 0;

// FUNCION DE COMPARTIR
const shareAction = (e: any) => {
  if (navigator.share && shareCount === 0) {
    navigator
      .share({
        title: Strings.navbar.title,
        text: Strings.files.shareText,
        url: e.target?.getAttribute("data-link")
      })
      .then(() => console.log("Successfully share"))
      .catch((error: Error) => console.log("Error sharing", error));
  } else {
    copy(e.target?.getAttribute("data-link"))
    showToasts();
  }
}

// COMPONENTE
const Index: React.FC = () => {
  // EFECTO RIPPLE
  useRipples();

  // ACTUALIZAR ESTADO CON DATOS OBTENIDOS
  const [data, setData]: [State, Dispatch<SetStateAction<State>>] = useState({ data: [defData] });

  if (count === 0) getData((data: firebase.database.DataSnapshot) => {
    const dataS: Idata[] = data.val();
    cData = dataS;
    copyD = dataS;
    count++;
    setData({ data: dataS })
  })

  // MOSTRAR LISTAS DE ARVHIVOS
  const Row = ({ index, style }: { index: number, style: any }) => {
    let c = data.data[index];
    return (
      <div id="filecontainer" style={style}>
        <Files
          showToast={showToasts}
          shareAction={shareAction}
          showPreview={showPreview}
          index={index}
          course={c.course}
          link={c.link}
          text={c.text}
          title={c.title}
          type={c.type}
          upload={c.upload}
        />
      </div>
    )
  }


  // OBTENER TEXTO DE BUSQUEDA
  const getVal = (val: string) => {
    const res: string = val.trim().toLowerCase();
    let searchData: Idata[] = [];
    for (let i: number = 0; i < cData.length; i++) {
      if (
        copyD[i].course.includes(res) ||
        copyD[i].link.includes(res) ||
        copyD[i].text.includes(res) ||
        copyD[i].title.includes(res) ||
        copyD[i].type.includes(res)
      ) searchData.push(copyD[i]);
    }
    setData({ data: searchData })
  }

  useEffect(() => {
    //VISTA PREVIA Y VIEWPORT
    const togglePreview: HTMLInputElement | null = document.getElementById("togglePreview") as HTMLInputElement;
    const vp: HTMLMetaElement | null = document.getElementById("viewport") as HTMLMetaElement;
    const closePrev: HTMLButtonElement | null = document.querySelector(".closePrev") as HTMLButtonElement;

    // SELECCIONAR MENSAJE DE ALERTA INFERIOR Y ESTADO DE CONEXION
    const toast: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(".toast") as NodeListOf<HTMLDivElement>;
    const online = navigator.onLine;

    // MOSTRA TOAST CON MENSAJE
    const showToast = (i: number) => {
      if (toast) {
        toast[0].style.transform = "translateY(100%)";
        toast[1].style.transform = "translateY(100%)";
        toast[i].style.transform = "translateY(0)";
        setTimeout(() => (toast[i].style.transform = "translateY(100%)"), 5000);
      }
    }

    // MOSTRAR ALERTA CUANDO RECUPERO LA CONEXION
    if (closeCount === 0) window.addEventListener("online", () => showToast(1));
    // MOSTRAR ALERTA CUANDO PERDIO LA CONEXION
    if (closeCount === 0) window.addEventListener("offline", () => showToast(0));

    // DETECTAR CONEXION AL ENTRAR
    if (!online) showToast(0);

    // MOSTRAR ALERTA AL COMPARTIR
    showToasts = () => showToast(2);

    // MOSTRAR VISTA PREVIA
    showPreview = (link: string) => {
      setTimeout(() => {
        setData({ data: copyD, preview: link });
      }, 100);
      togglePreview.checked = true;
      vp?.setAttribute("content", "width=device-width, initial-scale=1")
    }

    // QUITAR ZOOM
    if (closeCount === 0) closePrev.addEventListener("click", () => {
      setData({ data: copyD, preview: undefined });
      vp?.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=no")
    })

    closeCount++;
  })

  return (
    <>
      <Navbar {...Strings.navbar} getVal={getVal} />
      <input type="checkbox" id="togglePreview" />

      <div className="App">
        <div id="prels">
          {data.data.length <= 1 && <>
            <Preloader />
            <Preloader />
            <Preloader />
            <Preloader />
          </>}
        </div>

        {data.data.length > 1 && <List
          height={window.innerHeight + 100}
          itemCount={data.data.length}
          itemSize={300}
          width={window.innerWidth >= 1024 ? (window.innerWidth - window.innerWidth * 0.6) - 40 : window.innerWidth}
        >{Row}
        </List>
        }
      </div>

      <Toast text={Strings.toast.text_2} />
      <Toast text={Strings.toast.text_1} />
      <Toast text={Strings.files.share} />

      <span onClick={scrollTop} className="material-icons floating waves">arrow_upward</span>

      <div className="preview">
        <label htmlFor="togglePreview" className="material-icons closePrev waves waves-dark">close</label>

        {data.preview &&
          <>

            <Spinner />
            <iframe
              width="100%"
              height="100%"
              title={data.preview}
              src={`https://docs.google.com/gview?embedded=true&url=${data.preview}`}
            />

          </>
        }
      </div>
    </>
  );
}

export default Index;