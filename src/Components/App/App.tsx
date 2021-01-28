// REACT
import React from 'react'

// STRINGS
import Strings from 'Lang/Strings.json'

// CONTEXTO
import StringsContext from 'Context/StringsContext'

// INTERFACE
import { Es } from 'Env/Strings'

// ROUTER
import Router from 'Router/Router'

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
		<StringsContext.Provider value={{ ...DefState }}>
			<Router />
		</StringsContext.Provider>
	)
}

export default App
