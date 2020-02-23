// REACT AND APP
import React from 'react';
import ReactDOM from "react-dom";
import App from './Components/App/App';

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

// REGISTRAR SERVICE WORKER
serviceWorker.register({
  onUpdate: (registration: ServiceWorkerRegistration) => {
    // MOSTRAR ALERTA EN ACTUALIZACION
    showToast({
      text: Strings.toast.update,
      actionText: Strings.toast.update_btn,
      action: () => {
        const waitingServiceWorker = registration.waiting

        if (waitingServiceWorker) {
          waitingServiceWorker.addEventListener("statechange", (event: any) => {
            if (event.target && event.target.state === "activated")
              window.location.reload();
          });
          waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
        }
      },
      fixed: true
    })
  }
});

ReactDOM.render(<App />, document.getElementById('root'));