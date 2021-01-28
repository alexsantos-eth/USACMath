import { createContext, Context } from 'react'

// DARKMODE
interface ContextProps {
	darkmode: boolean
}

// VALOR POR DEFECTO
const DefContext: ContextProps = { darkmode: true }

// CONTEXTO
const DarkModeContext: Context<ContextProps> = createContext(DefContext)

export default DarkModeContext
