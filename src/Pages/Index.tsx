// ESTILOS Y TIPOS
import React, { Dispatch, SetStateAction, useState, useEffect, MouseEvent } from 'react';
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

// FUNCTION PARA PREVIUSALIZAR
let showPreview = (str: string) => { };

// LIMITAR LECTURAS Y DATOS
let currentData: Idata[];
let copyData: Idata[];
let h: number | undefined = undefined;
let w: number | undefined = undefined;
let count: number = 0;
let shareCount: number = 0;
let closeCount: number = 0;
let breakPoint: number = 0;
let appWidth: number = 0;

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

  // BUSCAR STRING EN TODOS LOS ARCHIVOS
  const searchFilter = (key: string) => {
    if (copyData && key.length > 0) {
      // FORMATEAR LA ENTRADA
      let searchData: Idata[] = [];

      // RECORRER CADA ARCHIVO
      for (let i = 0, len = copyData.length; i < len; i++) {
        if (
          copyData[i].course.indexOf(key) > 0 ||
          copyData[i].link.indexOf(key) > 0 ||
          copyData[i].text.indexOf(key) > 0 ||
          copyData[i].title.indexOf(key) > 0 ||
          copyData[i].type.indexOf(key) > 0 ||
          copyData[i].upload.indexOf(key) > 0
        ) searchData.push(copyData[i]);
      }

      // ACTUALIZAR LISTA
      currentData = searchData;
      setData({ data: searchData })
    }
    else if (copyData) setData({ data: copyData })
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
      action: () => window.location.reload(),
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
      <div id="filecontainer" style={style}>
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
        vp?.setAttribute("content", "width=device-width, initial-scale=1")
      }

      // QUITAR ZOOM
      closePrev.addEventListener("click", () => {
        vp?.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=no")
        setData({ data: currentData, preview: undefined })
      })

      // ASIGNAR ALTO Y ANCHO DE LOS MEDIA QUERIES DE CSS
      breakPoint = parseInt(getComputedStyle(document.body).getPropertyValue("--breakPoint").replace("px", ""))
      appWidth = parseInt(getComputedStyle(document.body).getPropertyValue("--appWidth").replace("px", ""))

      // AGREGAR UN VALOR FIJO AL ALTO Y ANCHO DE LA LISTA
      w = window.innerWidth >= breakPoint ? appWidth : window.innerWidth;
      h = window.innerHeight;

      // LIMITAR RENDER 
      closeCount++;
    }
  })

  return (
    <>
      <Navbar
        {...Strings.application}
        getVal={getVal}
        defaultValue={closeCount === 0 ? path : undefined}
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
          width={w || (window.innerWidth >= breakPoint ? appWidth : window.innerWidth)}
          height={h || window.innerHeight}
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