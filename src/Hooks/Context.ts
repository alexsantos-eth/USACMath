// REACT
import { useContext } from 'react'

// CONTEXTOS
import StringsContext from 'Context/Strings'
import DarkModeContext from 'Context/Darkmode'

// STRINGS
export const useStrings = () => {
	const { lang } = useContext(StringsContext)
	return lang
}

// STRINGS
export const useLangCode = () => {
	const { langCode } = useContext(StringsContext)
	return langCode
}

// DARKMODE
export const useDarkmode = () => {
	const { darkmode } = useContext(DarkModeContext)
	return darkmode
}
