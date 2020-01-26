// REACT AND APP
import React from 'react';
import App from './Components/App/App';
//@ts-ignore
import { render } from "react-snapshot";

// ESTILOS
import './index.css';

// SERVICE WORKERS
import * as serviceWorker from './serviceWorker';

render(<App />, document.getElementById('root'));
serviceWorker.register();
