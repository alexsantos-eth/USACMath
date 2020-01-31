// REACT Y ROUTER
import React from "react";
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

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route
            path='/'
            render={(props: RouteComponentProps<any>) => <Index {...props} />}
          />
          <Route
            path='/buscar/:key'
            render={(props: RouteComponentProps<any>) => <Index {...props} />}
          />
        </Switch>
      </Router>
    </>
  )
}

export default App;