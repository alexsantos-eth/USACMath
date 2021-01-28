// REACT
import React from 'react'
import { render } from 'react-dom'

// COMPONENTES
import App from 'Components/App/App'

// ESTILOS
import './index.css'

// SERVICE WORKER
import * as sw from './serviceWorker'

// RENDER
const root: HTMLDivElement | null = document.getElementById('root') as HTMLDivElement
const app: JSX.Element = (
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

// RECARGAR
render(app, root)

// REGISTRAR
sw.register()
