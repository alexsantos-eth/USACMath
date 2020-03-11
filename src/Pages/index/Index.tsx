// ESTILOS Y TIPOS
import React, { Dispatch, SetStateAction, useState, useEffect, MouseEvent } from 'react';
import './Index.css';

// COMPONENTES 
import Navbar from "../../Components/Navbar/Navbar";
import Files from "../../Components/Files/Files";
import Preloader from "../../Components/Preloader/Preloader";
import Spinner from "../../Components/Spinner/Spinner";

// TEXTOS
import Strings from "../../Strings/strings.json";

// COPIAR TEXTO
import copy from 'copy-to-clipboard';

// VER ARCHIVOS PDF
import PdfViewer from "../../Components/PDFViewer/PDFViewer";

// ICONOS, EFECTOS Y HOOKS
import { getData, showToast, asign, getScope, showAlert, addComment } from '../../Utils/hooks';
import { FixedSizeList as List } from 'react-window';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import firebase from "../../Keys/firebase";

// DATOS RESULTANTES
const defData: Idata = { course: "", link: "", title: "", text: "", type: "", upload: "" };

// FUNCION PARA PREVIUSALIZAR
let showPreview = (str: string) => { console.log(str) };

// FUNCION PARA MOSTARR COMENTARIOS
let showComments = (e: MouseEvent<HTMLButtonElement>) => { console.log(e) };

// LIMITAR LECTURAS Y DATOS
const vpstr = "width=device-width, initial-scale=1";
let currentData: Idata[];
let copyData: Idata[];

// PROPIEDADES DEL RENDER
const breakPoint: boolean = window.innerWidth >= 900 ? true : false;
const breakPointMid: boolean = window.innerWidth >= 500 ? true : false;
const breakPointMid2: boolean = window.innerWidth >= 600 ? true : false;
const breakPointLarge: boolean = window.innerWidth >= 1500 ? true : false;
const breakPointLarge2: boolean = window.innerWidth >= 1700 ? true : false;
const dH: number = window.innerHeight;
const dW: number = breakPointLarge2 ? 550 : breakPoint ? 450 : breakPointMid ? window.innerWidth - 70 : window.innerWidth;
const fH: number = breakPointMid2 ? breakPointLarge ? 350 : 320 : 270;
const fText: string = breakPoint ? Strings.application.general.main_2 : Strings.application.general.main;

interface State { data: Idata[]; preview?: string }

// FUNCION DE COMPARTIR
const shareAction = (e: MouseEvent<HTMLButtonElement>) => {
  // OBTNER LINK DE BOTON
  const el: HTMLButtonElement = e.target as HTMLButtonElement;
  const url: string | null = el?.getAttribute("data-link");

  // MOSTRAR MENSAJE DE SHRE API
  if (navigator.share && getScope(4) === 0 && url) {
    navigator
      .share({
        title: Strings.application.general.title,
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
  console.log("ds");
}

const createCommentBox = (file: string, indexFile: number, data?: IComments) => {
  // CREAR ELEMENTOS
  const box = document.createElement("div");
  const points = document.createElement("div");
  const comments = document.createElement("div");
  const comment = document.createElement("div");
  const pointsSpan = document.createElement("span");
  const pointsUl = document.createElement("ul");
  const pointList = document.createElement("ul");
  const pointsText = document.createElement("span");
  const commentLabel = document.createElement("label");
  const commentInput = document.createElement("input");
  const commentBtn = document.createElement("button");
  const resDiv = document.createElement("div");
  const pic = document.createElement("img");
  const boxDiv = document.createElement("div");

  // VERIFICAR ARCHIVO
  if (data) {
    // CALCULAR PUNTUACION
    const pointsAverage: number = data.points.reduce((a, b) => a + b, 0) / data.points.length;
    const starsCount: number = Math.round(pointsAverage);

    // CREAR ESTRELLAS
    for (let index = 0; index < 5; index++) {
      // CREARE ELEMENTOS
      const li = document.createElement("li");
      const i = document.createElement("i");

      // ASIGNAR CLASES Y TEXTOS
      i.classList.add("material-icons");
      i.classList.add(index < starsCount ? "fillStar" : "emptyStar");
      i.textContent = index < starsCount ? "star" : "star_border";

      // AGREGAR A LA LISTA
      li.appendChild(i);
      pointsUl.appendChild(li);
    }

    // AGREGAR COMENTARIOS
    for (let i = 0; i < data.comment.length; i++) {
      // CREAR OBJETOS
      const selfComment = document.createElement("div");
      const commentInfo = document.createElement("div");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      const span = document.createElement("span");
      const img = document.createElement("img");

      // ASIGNAR TEXTOS
      h3.textContent = data.author[i].name;
      img.src = data.author[i].photo;
      p.textContent = data.comment[i];
      span.textContent = data.upload[i];

      // AGREGAR A LA CAJA
      selfComment.appendChild(img);
      commentInfo.appendChild(h3);
      commentInfo.appendChild(p);
      commentInfo.appendChild(span);

      // AGREGAR AL CONTENEDOR
      selfComment.appendChild(commentInfo);
      comments.appendChild(selfComment);
    }

    // AREGAR TEXTO DE PUNTUACION
    pointsSpan.textContent = Strings.comments.points;
  }

  // SECCION DE ENVIAR COMENTARIOS
  let pointsRes: number = 0;
  let commentRes: string = "";

  // CREAR ESTRELLAS DINAMICAS
  for (let index = 0; index < 5; index++) {
    // CREAR ELEMENTOS
    const li = document.createElement("li");
    const i = document.createElement("i");

    // ASIGNAR TEXTOS
    i.classList.add("material-icons");
    i.textContent = "star_border";
    li.appendChild(i);

    // FUNCION HOVER
    li.addEventListener("mouseover", () => {
      if (pointsRes === 0)
        for (let i = 0; i <= index; i++)
          pointList.childNodes[i].childNodes[0].textContent = "star";
    })

    // ELIMINAR ESTRELLA
    li.addEventListener("mouseout", () => {
      if (pointsRes === 0)
        for (let i = 0; i <= index; i++)
          pointList.childNodes[i].childNodes[0].textContent = "star_border";
    })

    // ASIGNAR PUNTOS
    li.addEventListener("click", () => {
      for (let i = 0; i < 5; i++)
        pointList.childNodes[i].childNodes[0].textContent = "star_border";

      for (let i = 0; i <= index; i++)
        pointList.childNodes[i].childNodes[0].textContent = "star";

      pointsRes = index + 1;
    })

    // AGREGAR A LA LISTA
    pointList.appendChild(li);
  }

  // ASIGNAR COMENTARIO
  commentInput.addEventListener("keyup", () => commentRes = commentInput.value);

  // BOTTON DE ENVIAR
  commentBtn.textContent = Strings.comments.button;

  // HABILITAR O DESHABILITAR
  let ints = setInterval(() => {
    if (commentRes.length > 0 && pointsRes > 0) {
      commentBtn.style.background = "var(--buttons)"
      commentBtn.style.opacity = "1";
      commentBtn.style.cursor = "pointer"
    } else {
      commentBtn.style.background = "var(--gray)"
      commentBtn.style.opacity = "0.8";
      commentBtn.style.cursor = "not-allowed"
    }
  }, 10);

  // ENVIAR COMENTARIO
  let clickCounter = 0;
  commentBtn.addEventListener("click", () => {
    if (commentRes.length > 0 && pointsRes > 0 && clickCounter === 0) {
      // CREAR COMENTARIO VACIO
      let defData: IComments = {
        points: [],
        comment: [],
        file: "",
        author: [],
        upload: []
      };

      // SELECCIONAR VACIO O DE DB
      let currentData: IComments = data || defData;

      // AGREGAR AL OBJETO
      currentData.file = file;
      currentData.points.push(pointsRes);
      currentData.comment.push(commentRes);
      currentData.upload.push(new Date().toUTCString())
      currentData.author.push({
        photo: firebase.auth().currentUser?.photoURL || "",
        name: firebase.auth().currentUser?.displayName || ""
      })

      // ESPERAR HASTA QUE SE ENVIE
      clickCounter++;
      commentBtn.style.cursor = "not-allowed"
      addComment(currentData, indexFile)
        .then(() => {
          // SELCCIONAR CAJA DE ALERTA
          const alerts: NodeListOf<HTMLDivElement> = document.querySelectorAll(".alertContainer") as NodeListOf<HTMLDivElement>;

          // ELIMINAR CAJA
          alerts.forEach((alert: HTMLDivElement) => {
            // OPACIDAD
            alert.style.opacity = "0";

            // ELIMINAR
            setTimeout(() => document.body.removeChild(alert), 400);
          })
        })
    }
  })

  // AGREGAR LABEL
  commentLabel.classList.add("material-icons");
  commentLabel.textContent = "comment";
  commentLabel.setAttribute("for", "commentInput");

  // AGREGAR INPUT
  commentInput.placeholder = Strings.application.placeholders.comment;
  commentInput.setAttribute("id", "commentInput");

  // ASIGNAR A LA CAJA
  box.classList.add("commentBox");

  // ASIGNAR AL DOM
  pointsText.textContent = Strings.comments.setPoints;
  resDiv.appendChild(pointsText)
  resDiv.appendChild(pointList);
  resDiv.appendChild(commentBtn);

  // ASIGNAR FOTO SI EXISTE
  pic.src = firebase.auth().currentUser?.photoURL || "";
  boxDiv.appendChild(pic);
  boxDiv.appendChild(commentLabel);
  boxDiv.appendChild(commentInput);
  comment.appendChild(boxDiv);
  comment.appendChild(resDiv);

  points.appendChild(pointsSpan);
  points.appendChild(pointsUl);

  box.appendChild(points);
  box.appendChild(comments);
  box.appendChild(comment);

  return {
    box,
    ints
  };
}

// COMPONENTE
const Index: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  // ACTUALIZAR ESTADO CON DATOS OBTENIDOS
  const [data, setData]: [State, Dispatch<SetStateAction<State>>] = useState({ data: [defData] });

  // OBETNER PATHNAME Y VARIABLES GLOBALES
  const count: number = getScope(0);
  const closeCount: number = getScope(2);
  const path: string = useLocation().pathname.substr(8);
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
    // ENVIAR ALERTA SI HAY ACTUALIZACION
    showToast({
      text: Strings.toast.update,
      actionText: Strings.toast.update_btn,
      action: () => {
        asign(0, 0);
        setData({ data: currentData })
      },
      fixed: true
    })
  })
    .then((resData: {
      data: Idata[],
      comments: IComments[]
    }) => {
      if (resData) {
        // ASIGNAR DATOS  
        copyData = currentData = resData.data;

        // LIMITAR PETICIONES
        asign(1, 0);

        // MOSTRAR PREVIEW
        const preview: HTMLDivElement = document.querySelector(".preview") as HTMLDivElement;
        preview.style.display = "flex";

        // OBTENER TEXTO DE PATH SI EXISTE
        if (path.length > 0) searchFilter(path.trim().toLowerCase());
        else setData({ data: resData.data })
      }
    })
    .catch((e: Error) => console.log(e));

  // MOSTRAR LISTAS DE ARVHIVOS
  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    return (
      <div className="filecontainer" style={style}>
        <Files {...{ shareAction, showPreview, index, showComments }} {...data.data[index]} />
      </div>
    )
  }

  showComments = (e: MouseEvent<HTMLButtonElement>) => {
    // EVENTO SINTENTICO
    e.persist();

    // VERIFICAR SI EXISTE USUARIO
    if (firebase.auth().currentUser) {
      getData(() => { })
        .then(resData => {
          // OBTENER ARCHIVO
          const el: HTMLButtonElement = e.target as HTMLButtonElement;
          const file: string | null = el?.getAttribute("data-file");
          let fileIndex = -1;

          // BUSCAR EN ARCHIVOS LOS COMENTARIOS
          if (resData.comments) for (let commentsIndex = 0; commentsIndex < resData.comments.length; commentsIndex++)
            if (resData.comments[commentsIndex]?.file.toLowerCase().trim() === file?.toLowerCase().trim()) {
              fileIndex = commentsIndex;
              break;
            }

          // SI EXISTEN COMENTARIOS
          if (fileIndex >= 0) {
            // CREAR CAJA DE COMENTARIOS
            const commentBox = resData.comments ? createCommentBox(file || "", fileIndex, resData.comments[fileIndex]) : undefined;

            // MOSTRARLOS EN ALERTA WINDOW
            showAlert({
              title: "",
              body: "",
              type: "window",
              customElements: commentBox ? commentBox.box : undefined,
              onHide: () => {
                if (commentBox)
                  clearInterval(commentBox.ints);
              }
            })
          }

          // SINO CREAR CAJA VACIA
          else {
            const commentBox = resData.comments ? createCommentBox(file || "", resData.comments.length) : undefined;
            showAlert({
              title: Strings.alerts.comments.notFound,
              body: Strings.alerts.comments.notFoundText,
              type: "window",
              customElements: commentBox ? commentBox.box : undefined,
              onHide: () => {
                if (commentBox)
                  clearInterval(commentBox.ints);
              }
            })
          }
        })
    }

    // SINO MOSTRAR INICIO DE SESION
    else {
      const logBtn = document.getElementById("logBtn");
      logBtn?.click();
    }
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
      asign(1, 2);
    }
  })

  return (
    <>
      <Navbar
        {...Strings.application}
        getVal={getVal}
        defaultValue={defValue}
        fText={fText}
      />

      <input type="checkbox" id="togglePreview" value="false" />

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