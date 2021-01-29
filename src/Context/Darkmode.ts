import { createContext, Context } from 'react'

// DARKMODE
interface ContextProps {
	darkmode: boolean
	setDarkmode: (darkmode: boolean) => unknown
}

// VALOR POR DEFECTO
const DefContext: ContextProps = { darkmode: true, setDarkmode: () => {} }

// CONTEXTO
const DarkModeContext: Context<ContextProps> = createContext(DefContext)

export default DarkModeContext
