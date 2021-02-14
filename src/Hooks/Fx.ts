// REACT
import { useEffect } from 'react'

// TOOLS
import { toggleDarkMode } from 'Utils/Tools'

/**
 * Hook para cargar datos iniciales del darkmode
 * @param  {(darkMode:boolean)=>unknown} setState
 */
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

/**
 * Usar meta tag de títulos
 * @param  {string} title
 */
export const useMetaTitle = (title: string): void => {
	useEffect(() => {
		// ASIGNAR
		document.title = title
	}, [title])
}
