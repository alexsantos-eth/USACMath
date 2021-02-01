// REACT
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// APP
import App from 'Components/App/App'

// UTILS
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

serviceWorkerRegistration.register()
reportWebVitals()
