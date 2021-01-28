// REACT
import React from 'react'

// ROUTER
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// STRINGS
import Strings from 'Lang/Strings.json'

// CONTEXTO
import MainContext from 'Context/MainContext'

// PAGINAS
import Index from 'Pages/Index/Index'

// INTERFACE
import { Es } from 'Env/Strings'

// ESTADO
interface AppState {
	langCode: string
	lang: Es
}

// ESTADO POR DEFECTO
const DefState: AppState = {
	langCode: 'ES',
	lang: Strings.es,
}

const App: React.FC = () => {
	return (
		<MainContext.Provider value={{ ...DefState }}>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Index} />
				</Switch>
			</BrowserRouter>
		</MainContext.Provider>
	)
}

export default App
