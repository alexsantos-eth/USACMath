// REACT
import { useContext } from 'react'

// CONTEXTOS
import StringsContext from 'Context/Strings'
import DarkModeContext from 'Context/Darkmode'
import AuthContext from 'Context/Auth'

// TYPES
import { Es } from 'Env/Strings'

// STRINGS
export const useStrings = (): Es => {
	const { lang } = useContext(StringsContext)
	return lang
}

// STRINGS
export const useLangCode = (): string => {
	const { langCode } = useContext(StringsContext)
	return langCode
}

// DARKMODE
export const useDarkmode = (): boolean => {
	const { darkmode } = useContext(DarkModeContext)
	return darkmode
}

// DARKMODE
export const useSetDarkmode = (): ((darkmode: boolean) => void) => {
	const { setDarkmode } = useContext(DarkModeContext)
	return setDarkmode
}

// USER
export const useUser = (): User | null => {
	const { user } = useContext(AuthContext)
	return user
}
