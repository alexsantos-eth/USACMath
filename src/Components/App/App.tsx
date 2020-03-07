// REACT Y ROUTER
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";

// PAGINAS
import Index from "../../Pages/index/Index";
import Schedule from "../../Pages/schedule/Schedule";

// ICONOS
import "../../Icons/style.css";
import { showToast, messaging, sendToken, changeTheme, setProviders } from '../../Utils/hooks';
import Toolbar from "../Toolbar/Toolbar";

// ASIGNAR LAS VARIABLES GLOBALES
window.localStorage.setItem("limiters", "0,0,0,0");

const App: React.FC = () => {
  useEffect(() => {
    // PEDIR PERMISO PARA NOTIFICAR
    messaging.requestPermission()
      .then(async function () {
        // OBTENER TOKEN
        const token: string = await messaging.getToken();

        // ENVIAR TOKEN AL SERVIDOR
        if (!window.localStorage.getItem("token")) {
          sendToken(token, (e: Error | null) => {
            window.localStorage.setItem("token", token);
            if (e) console.log(e);
          });
        }
      })
      // NO EXISTE PERMISO DEL USUARIO
      .catch(function (err: Error) {
        console.log("Unable to get permission to notify.", err);
      });

    // CUANDO SE RECIBE MENSAJE PUSH
    navigator.serviceWorker.addEventListener("message", (message: MessageEvent) => showToast({ text: message.data["firebaseMessagingData"].notification.body }));

    // SELECCIONAR TEMAS
    if (!window.localStorage.getItem("theme")) window.localStorage.setItem("theme", "dark")
    else changeTheme();

    // AGREGAR AUTH
    setProviders();
  })

  return (
    <>
      <Router>
        <Toolbar />
        <Switch>
          <Route
            exact
            path='/'
            render={(props: RouteComponentProps) => <Index {...props} />}
          />
          <Route
            exact
            path='/buscar/:key'
            render={(props: RouteComponentProps) => <Index {...props} />}
          />
          <Route
            exact
            path='/horarios'
            component={Schedule}
          />
        </Switch>
      </Router>
    </>
  )
}

export default App;