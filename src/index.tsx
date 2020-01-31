// REACT AND APP
import React from 'react';
import App from './Components/App/App';
//@ts-ignore
import { render } from "react-snapshot";

// ESTILOS
import './index.css';

// TEXTOS
import Strings from "./Strings/strings.json";

// HOOK DE TOAST
import { showToast } from './Utils/hooks';

// SERVICE WORKERS
import * as serviceWorker from './serviceWorker';

//ESTADO DE CONEXION
const online = navigator.onLine;

// MOSTRAR ALERTA CUANDO RECUPERO LA CONEXION
window.addEventListener("online", () => showToast(Strings.toast.text_1));

// MOSTRAR ALERTA CUANDO PERDIO LA CONEXION
window.addEventListener("offline", () => showToast(Strings.toast.text_2));

// DETECTAR CONEXION AL ENTRAR
if (!online) showToast(Strings.toast.text_2);

render(<App />, document.getElementById('root'));
serviceWorker.register({
  onUpdate: () => {
    showToast(Strings.toast.update)
    setTimeout(() => {
      window.location.reload();
    }, 5300);
  }
});
