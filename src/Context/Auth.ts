import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	user: User | null
	setUser?: (user: User | null) => unknown
}

// VALOR POR DEFECTO
const DefContext: ContextProps = { user: null, setUser: () => null }

// CONTEXTO
const AuthContext: Context<ContextProps> = createContext(DefContext)

export default AuthContext
