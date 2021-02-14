// REACT
import { useContext } from 'react'

// CONTEXTOS
import StringsContext from 'Context/Strings'
import DarkModeContext from 'Context/Darkmode'
import AuthContext from 'Context/Auth'

// TYPES
import { Es } from 'Env/Strings'

/**
 * Hook para utilizar los strings globales
 */
export const useStrings = (): Es => {
	const { lang } = useContext(StringsContext)
	return lang
}

/**
 * Hook para utilizar el código de idioma
 * @returns 'es' | 'en'
 */
export const useLangCode = (): string => {
	const { langCode } = useContext(StringsContext)
	return langCode
}

/**
 * Hook para utilizar el darkmode
 * @description true si esta en darkmode o false si es lightode
 */
export const useDarkmode = (): boolean => {
	const { darkmode } = useContext(DarkModeContext)
	return darkmode
}

/**
 * Hook para cambiar el darkmode
 */
export const useSetDarkmode = (): ((darkmode: boolean) => void) => {
	const { setDarkmode } = useContext(DarkModeContext)
	return setDarkmode
}

/**
 * Hook para utilizar los datos del usuario
 */
export const useUser = (): User | null => {
	const { user } = useContext(AuthContext)
	return user
}
