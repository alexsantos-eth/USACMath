// REACT
import { useEffect } from 'react'

// TOOLS
import { toggleDarkMode } from 'Utils/Tools'

// DARK MODE
export const useLoadDarkmode = (setState: (darkMode: boolean) => unknown): void =>
	useEffect(() => {
		// OBTENER VALOR ACTUAL
		const localDarkmode: string | null = window.localStorage.getItem('darkmode')
		const currentDark: boolean = localDarkmode ? localDarkmode === '1' : true

		// CAMBIAR CSS
		if (!localDarkmode) window.localStorage.setItem('darkmode', '1')
		toggleDarkMode()

		// ACTUALIZAR ESTADO
		setState(currentDark)
	}, [setState])

// USAR TITULO Y DESCRIPCIÓN
export const useMetaTitle = (title: string): void => {
	useEffect(() => {
		// ASIGNAR
		document.title = title
	}, [title])
}
