import { createContext, Context } from 'react'

// STRINGS
import Strings from 'Lang/Strings.json'

// INTERFACE
import { Es } from 'Env/Strings'

// KEYS
interface ContextProps {
	lang: Es
	langCode: string
}

// VALOR POR DEFECTO
const DefContext: ContextProps = { lang: Strings.es, langCode: 'ES' }

// CONTEXTO
const MainContext: Context<ContextProps> = createContext(DefContext)

export default MainContext
