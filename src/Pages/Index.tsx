// ESTILOS Y TIPOS
import React, { Dispatch, SetStateAction, useState, useEffect, MouseEvent } from 'react';
import './Index.css';

// COMPONENTES 
import Navbar from "../Components/Navbar/Navbar";
import Files from "../Components/Files/Files";
import Preloader from "../Components/Preloader/Preloader";
import Spinner from "../Components/Spinner/Spinner";
import Toolbar from "../Components/Toolbar/Toolbar"

// TEXTOS
import Strings from "../Strings/strings.json";

// COPIAR TEXTO
import copy from 'copy-to-clipboard';

// VER ARCHIVOS PDF
import PdfViewer from "../Components/PDFViewer/PDFViewer";

// ICONOS, EFECTOS Y HOOKS
import { getData, showToast } from '../Utils/hooks';
import { FixedSizeList as List } from 'react-window';
import { RouteComponentProps } from 'react-router-dom';

// DATOS RESULTANTES
const defData: Idata = { course: "", link: "", title: "", text: "", type: "", upload: "" };

// FUNCTION PARA PREVIUSALIZAR
let showPreview = (str: string) => { };

// LIMITAR LECTURAS Y DATOS
const vpstr = "width=device-width, initial-scale=1";
let currentData: Idata[];
let copyData: Idata[];
let count: number = 0;
let shareCount: number = 0;
let closeCount: number = 0;

// PROPIEDADES DEL RENDER
const breakPoint: boolean = window.innerWidth >= 900 ? true : false;
const breakPointMid: boolean = window.innerWidth >= 500 ? true : false;
const breakPointMid2: boolean = window.innerWidth >= 600 ? true : false;
const dH: number = window.innerHeight;
const dW: number = breakPoint ? 450 : breakPointMid ? window.innerWidth - 70 : window.innerWidth;
const fH: number = breakPointMid2 ? 310 : 270;
const fText: string = breakPoint ? Strings.application.text_2 : Strings.application.text;

interface State { data: Idata[]; preview?: string }

// FUNCION DE COMPARTIR
const shareAction = (e: MouseEvent<HTMLButtonElement>) => {
  // OBTNER LINK DE BOTON
  const el: HTMLButtonElement = e.target as HTMLButtonElement;
  const url: string | null = el?.getAttribute("data-link");

  // MOSTRAR MENSAJE DE SHRE API
  if (navigator.share && shareCount === 0 && url) {
    navigator
      .share({
        title: Strings.application.title,
        text: Strings.share.text,
        url
      })
      .then(() => console.log("Successfully share"))
      .catch((error: Error) => console.log("Error sharing", error));
  } else if (url) {
    // COPIAR AL PORTAPAPELES SI NO ESTA DISPONIBLE SHARE API
    copy(url);
    showToast({ text: Strings.toast.share });
  }
}

// COMPONENTE
const Index: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  // ACTUALIZAR ESTADO CON DATOS OBTENIDOS
  const [data, setData]: [State, Dispatch<SetStateAction<State>>] = useState({ data: [defData] });

  // OBETNER PATHNAME
  const path: string = props.location.pathname.substr(8);
  const defValue: string | undefined = closeCount === 0 ? path : undefined;

  // BUSCAR STRING EN TODOS LOS ARCHIVOS
  const searchFilter = (key: string) => {
    if (copyData && key.length > 0) {
      // FORMATEAR LA ENTRADA
      let searchData: Idata[] = [];

      // RECORRER CADA ARCHIVO
      for (let i = 0, len = copyData.length; i < len; i++) {
        if (
          copyData[i].title.indexOf(key) !== -1 ||
          copyData[i].text.indexOf(key) !== -1 ||
          copyData[i].course.indexOf(key) !== -1 ||
          copyData[i].link.indexOf(key) !== -1 ||
          copyData[i].type.indexOf(key) !== -1 ||
          copyData[i].upload.indexOf(key) !== -1
        )
          searchData.push(copyData[i]);
      }

      // ACTUALIZAR LISTA
      currentData = searchData;
      setData({ data: searchData })
    }
    // SI EL KEY ESTA VACIO ACTUALIZAR AL VALOR INICIAL
    else if (copyData) {
      setData({ data: copyData })
      props.history.push("/");
    }
  }

  // OBETNER BUSQUEDS
  const getVal = (val: string, update?: boolean) => {
    if (update && val.length > 0) props.history.push(`/buscar/${val}`);
    searchFilter(val)
  }

  // OBETNER DATOS DE FIREBASE
  if (count === 0) getData(() => {
    showToast({
      text: Strings.toast.update,
      actionText: Strings.toast.update_btn,
      action: () => {
        count = 0;
        setData({ data: currentData });
      },
      fixed: true
    })
  })
    .then((data: Idata[]) => {
      if (data) {
        // ASIGNAR DATOS  
        copyData = currentData = data;

        // LIMITAR PETICIONES
        count++;

        // OBTENER TEXTO DE PATH SI EXISTE
        if (path.length > 0) searchFilter(path.trim().toLowerCase());
        else setData({ data })
      }
    })
    .catch((e: Error) => console.log(e));

  // MOSTRAR LISTAS DE ARVHIVOS
  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    return (
      <div className="filecontainer" style={style}>
        <Files {...{ shareAction, showPreview, index }} {...data.data[index]} />
      </div>
    )
  }

  useEffect(() => {
    if (closeCount === 0) {
      //VISTA PREVIA Y VIEWPORT
      const togglePreview: HTMLInputElement | null = document.getElementById("togglePreview") as HTMLInputElement;
      const vp: HTMLMetaElement | null = document.getElementById("viewport") as HTMLMetaElement;
      const closePrev: HTMLButtonElement | null = document.querySelector(".closePrev") as HTMLButtonElement;

      // MOSTRAR VISTA PREVIA
      showPreview = (link: string) => {
        setTimeout(() => {
          setData({ data: currentData, preview: link })
        }, 100);
        togglePreview.checked = true;
        vp?.setAttribute("content", vpstr)
      }

      // QUITAR ZOOM
      closePrev.addEventListener("click", () => {
        vp?.setAttribute("content", vpstr + ", user-scalable=no");
        setData({ data: currentData, preview: undefined })
      })

      // LIMITAR RENDER 
      closeCount++;
    }
  })

  return (
    <>
      <Toolbar />
      <Navbar
        {...Strings.application}
        getVal={getVal}
        defaultValue={defValue}
        fText={fText}
      />

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
          width={dW}
          height={dH}
          itemCount={data.data.length}
          itemSize={fH}
        >{Row}
        </List>
        }

      </div>

      <div className="preview">
        <label htmlFor="togglePreview" className="material-icons closePrev waves waves-dark">close</label>
        {data.preview &&
          <>
            <Spinner />
            <PdfViewer src={data.preview} title={"PDF desde: " + data.preview} />
          </>
        }
      </div>
    </>
  );
}

export default Index;