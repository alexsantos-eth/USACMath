// REACT
import React from 'react'

// STRINGS
import Strings from 'Lang/Strings.json'

// CONTEXTO
import StringsContext from 'Context/Strings'

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

const StringsProvider: React.FC = ({ children }: React.ComponentProps<'div'>): JSX.Element => {
	return (
		<StringsContext.Provider value={{ ...DefState }}>
			<main>{children}</main>
		</StringsContext.Provider>
	)
}

export default StringsProvider
