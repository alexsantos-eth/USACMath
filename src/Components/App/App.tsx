import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import "../../Icons/style.css";

import Index from "../../Pages/Index";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App;