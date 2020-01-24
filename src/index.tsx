// REACT AND APP
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';

// ESTILOS
import './index.css';

// SERVICE WORKERS
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
