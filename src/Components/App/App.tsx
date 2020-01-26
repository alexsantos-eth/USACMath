// STILOS Y FIREBASE
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import firebase from "../../Keys/firebase";
import "firebase/database";
import './App.css';

// COMPONENTES 
import Navbar from "../Navbar/Navbar";
import Files from "../Files/Files";
import Preloader from "../Preloader/Preloader";
import Toast from "../Toast/Toast"
import Footer from "../Footer/Footer";

// TEXTOS
import Strings from "../../Strings/strings.json";

// ICONOS
import "../../Icons/style.css";
import { useRipples } from '../../Utils/hooks';

// BASE DE DATOS FIREBASE
const db = firebase.database();
const ref = db.ref("data");

// HOOK PARA OBTENER DATOS
const getData = (callback: Function) => ref.once("value", (data: firebase.database.DataSnapshot) => callback(data))

// DATOS RESULTANTES
const defData: Idata = { course: "", link: "", title: "", text: "", type: "", upload: "" };

// MOSTRAR TEXTO AL COMPARTIR
let showToasts = () => { };

// LIMITAR LECTURAS Y DATOS
let dataPart: number = 4;
let count: number = 0;
let cData: Idata[];
let copy: Idata[];

interface State { data: [Idata[], Idata[]]; showMore?: boolean }

// COMPONENTE
const App: React.FC = () => {
  // EFECTO RIPPLE
  useRipples();

  // ACTUALIZAR ESTADO CON DATOS OBTENIDOS
  const [data, setData]: [State, Dispatch<SetStateAction<State>>] = useState({ data: [[defData], [defData]] });
  if (count === 0) getData((data: firebase.database.DataSnapshot) => {
    const dataS: Idata[] = data.val();
    cData = dataS;
    copy = dataS;
    setData({
      data: [dataS.slice(0, dataPart), dataS.slice(dataPart)]
    })
    count++;
  })

  // OBTENER TEXTO DE BUSQUEDA
  const getVal = (val: string) => {
    const res: string = val.trim().toLowerCase();
    let searchData: Idata[] = [];
    for (let i: number = 0; i < cData.length; i++) {
      if (
        copy[i].course.includes(res) ||
        copy[i].link.includes(res) ||
        copy[i].text.includes(res) ||
        copy[i].title.includes(res) ||
        copy[i].type.includes(res)
      ) searchData.push(copy[i]);
    }
    setData({
      data: [searchData.slice(0, dataPart), searchData.slice(dataPart)]
    })
  }

  // BOTON DE MOSTRAR MAS
  const showMore = () => {
    setData({
      data: data.data,
      showMore: !data.showMore
    });
  }

  useEffect(() => {
    // LIMITAR A 6 ARCHIVOS POR PAGINA EN ESCRITORIO
    if (window.innerWidth >= 720) dataPart = 6;

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
    window.addEventListener("online", () => showToast(1));
    // MOSTRAR ALERTA CUANDO PERDIO LA CONEXION
    window.addEventListener("offline", () => showToast(0));

    // DETECTAR CONEXION AL ENTRAR
    if (!online) showToast(0);

    // MOSTRAR ALERTA AL COMPARTIR
    showToasts = () => showToast(2);
  })

  return (
    <>
      <Navbar {...Strings.navbar} getVal={getVal} />
      <div className="App">
        <div id="prels">
          {data.data[0].length <= 1 && <Preloader />}
          {data.data[0].length <= 1 && window.innerWidth >= 720 && <Preloader />}
        </div>
        {data.data[0].length > 1 && <Files showToast={showToasts} data={data.data[0]} appName={Strings.navbar.title} {...Strings.files} />}
        {data.data[0].length > 1 && <button onClick={showMore} id="showMore" className={data.showMore ? "waves waves-dark active" : "waves waves-dark"}><i className="material-icons">{data.showMore ? "expand_less" : "expand_more"}</i>{data.showMore ? Strings.showLess : Strings.showMore}</button>}
        {data.showMore && <Files showToast={showToasts} data={data.data[1]} appName={Strings.navbar.title} {...Strings.files} />}
      </div>
      <Toast text={Strings.toast.text_2} />
      <Toast text={Strings.toast.text_1} />
      <Toast text={Strings.files.share} />
      <Footer {...Strings.rights} />
    </>
  );
}

export default App;