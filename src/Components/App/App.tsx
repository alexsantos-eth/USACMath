// STILOS
import React from 'react';
import './App.css';

// COMPONENTES 
import Navbar from "../Navbar/Navbar";
import Data from "../Data/Data";

// TEXTOS
import Strings from "../../Strings/strings.json";

// ICONOS
import "../../Icons/style.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar {...Strings.navbar}/>
      <Data/>
    </div>
  );
}

export default App;
