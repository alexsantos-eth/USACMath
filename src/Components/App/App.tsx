// REACT Y ROUTER
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";

// PAGINAS
import Index from "../../Pages/Index";

// ICONOS
import "../../Icons/style.css";
import { showToast, messaging, sendToken, changeTheme } from '../../Utils/hooks';

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
  })

  return (
    <>
      <Router>
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
        </Switch>
      </Router>
    </>
  )
}

export default App;