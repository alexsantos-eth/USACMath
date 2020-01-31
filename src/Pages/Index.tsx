// ESTILOS Y TIPOS
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import './Index.css';

// COMPONENTES 
import Navbar from "../Components/Navbar/Navbar";
import Files from "../Components/Files/Files";
import Preloader from "../Components/Preloader/Preloader";
import Spinner from "../Components/Spinner/Spinner";

// TEXTOS
import Strings from "../Strings/strings.json";

// COPIAR TEXTO
import copy from 'copy-to-clipboard';

// ICONOS, EFECTOS Y HOOKS
import { getData, showToast } from '../Utils/hooks';
import { FixedSizeList as List } from 'react-window';
import { RouteComponentProps } from 'react-router-dom';

// DATOS RESULTANTES
const defData: Idata = { course: "", link: "", title: "", text: "", type: "", upload: "" };

// MOSTRAR TEXTO AL COMPARTIR
let showToasts = () => showToast(Strings.toast.share);

// FUNCTION PARA PREVIUSALIZAR
let showPreview = (str: string) => { };

// LIMITAR LECTURAS Y DATOS
let count: number = 0;
let closeCount: number = 0;
let cData: Idata[];
let copyD: Idata[];

interface State { data: Idata[]; showMore?: boolean; preview?: string }

// LIMITAR SHARE API
let shareCount: number = 0;

// FUNCION DE COMPARTIR
const shareAction = (e: any) => {
  if (navigator.share && shareCount === 0) {
    navigator
      .share({
        title: Strings.application.title,
        text: Strings.share.text,
        url: e.target?.getAttribute("data-link")
      })
      .then(() => console.log("Successfully share"))
      .catch((error: Error) => console.log("Error sharing", error));
  } else {
    // COPIAR AL PORTAPAPELES SI NO ESTA DISPONIBLE SHARE API
    copy(e.target?.getAttribute("data-link"))
    showToasts();
  }
}

// COMPONENTE
const Index: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  // OBETNER PATHNAME
  const path: string = props.location.pathname.substr(8);

  // BUSCAR STRING EN TODOS LOS ARCHIVOS
  const searchFilter = (key: string) => {
    // FORMATEAR LA ENTRADA
    const res: string = key?.trim().toLowerCase();
    let searchData: Idata[] = [];

    // RECORRER CADA ARCHIVO DE LA COPIA
    if (copyD) for (let i: number = 0; i < copyD.length; i++) {
      if (
        copyD[i].course.includes(res) ||
        copyD[i].link.includes(res) ||
        copyD[i].text.includes(res) ||
        copyD[i].title.includes(res) ||
        copyD[i].type.includes(res) ||
        copyD[i].upload.includes(res)
      ) searchData.push(copyD[i]);
    }

    // ACTUALIZAR LISTA
    cData = searchData;
    setData({ data: searchData })
  }

  // ACTUALIZAR ESTADO CON DATOS OBTENIDOS
  const [data, setData]: [State, Dispatch<SetStateAction<State>>] = useState({ data: [defData] });

  if (count === 0) getData((data: firebase.database.DataSnapshot) => {
    //OBTENER DATOS DE FIREBASE
    const dataS: Idata[] = data.val();

    // LISTA VARIABLE
    cData = dataS;

    // LISTA FIJA
    copyD = dataS;

    // ACTUALIZAR LISTA
    count++;
    setData({ data: dataS })

    // OBTENER TEXTO DE PATH
    if (path.length > 0) searchFilter(path);
  })

  // MOSTRAR LISTAS DE ARVHIVOS
  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    let c: Idata = data.data[index];
    let props = { shareAction, showPreview, index };

    return (
      <div id="filecontainer" style={style}>
        <Files {...props} {...c} />
      </div>
    )
  }

  // OBTENER TEXTO DE BUSQUEDA
  const getVal = (val: string) => searchFilter(val)

  useEffect(() => {
    //VISTA PREVIA Y VIEWPORT
    const togglePreview: HTMLInputElement | null = document.getElementById("togglePreview") as HTMLInputElement;
    const vp: HTMLMetaElement | null = document.getElementById("viewport") as HTMLMetaElement;
    const closePrev: HTMLButtonElement | null = document.querySelector(".closePrev") as HTMLButtonElement;

    // MOSTRAR VISTA PREVIA
    showPreview = (link: string) => {
      setTimeout(() => {
        setData({ data: cData, preview: link })
      }, 100);
      togglePreview.checked = true;
      vp?.setAttribute("content", "width=device-width, initial-scale=1")
    }

    // QUITAR ZOOM
    if (closeCount === 0) closePrev.addEventListener("click", () => {
      vp?.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=no")
      setData({ data: cData, preview: undefined })
    })

    // LIMITAR RENDER 
    closeCount++;
  })

  return (
    <>
      <Navbar {...Strings.application} getVal={getVal} />
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
          width={window.innerWidth >= 1024 ? (window.innerWidth - window.innerWidth * 0.6) - 40 : window.innerWidth}
          height={window.innerHeight + 115}
          itemCount={data.data.length}
          itemSize={270}
        >{Row}
        </List>
        }
      </div>

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