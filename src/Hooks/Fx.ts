// REACT
import { useEffect } from 'react'

// TOOLS
import { toggleDarkMode } from 'Utils/Tools'

// DARK MODE
export const useLoadDarkmode = (setState: (darkMode: boolean) => unknown) =>
	useEffect(() => {
		// OBTENER VALOR ACTUAL
		const currentDark: boolean = window.localStorage.getItem('darkmode') === '1'

		// CAMBIAR CSS
		toggleDarkMode()

		// ACTUALIZAR ESTADO
		setState(currentDark)
	}, [setState])

// USAR TITULO Y DESCRIPCIÓN
export const useMetaTitle = (title: string) => {
	useEffect(() => {
		// ASIGNAR
		document.title = title
	}, [title])
}
