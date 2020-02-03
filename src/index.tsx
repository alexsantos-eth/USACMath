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
window.addEventListener("online", () => showToast({ text: Strings.toast.text_1 }));

// MOSTRAR ALERTA CUANDO PERDIO LA CONEXION
window.addEventListener("offline", () => showToast({
  text: Strings.toast.text_2,
  actionText: Strings.toast.update_btn,
  action: () => window.location.reload(),
  fixed: true
}));

// DETECTAR CONEXION AL ENTRAR
if (!online) showToast({
  text: Strings.toast.text_2,
  actionText: Strings.toast.update_btn,
  action: () => window.location.reload(),
  fixed: true
});


render(<App />, document.getElementById('root'));
serviceWorker.register({
  onUpdate: () => {
    showToast({
      text: Strings.toast.update,
      actionText: Strings.toast.update_btn,
      action: () => window.location.reload(),
      fixed: true
    })
  }
});
