// REACT
import { useEffect } from 'react'

// TOOLS
import { toggleDarkMode } from 'Utils/Tools'
import { isDark } from 'Env/Globals'

// DARK MODE
export const useLoadDarkmode = (setState: (darkMode: boolean) => unknown) =>
	useEffect(() => {
		// OBTENER VALOR ACTUAL
		const currentDark: boolean = window.localStorage.getItem('darkmode') === '1'

		// DETECTAR TEMA DE OS
		if (isDark) window.localStorage.setItem('darkmode', '1')

		// CAMBIAR CSS
		toggleDarkMode()

		// ACTUALIZAR ESTADO
		setState(currentDark)
	}, [setState])

// HOOK DE ACTUALIZACIONES
export const useUpdate = () => {
	useEffect(() => {
		import('Utils/Tools').then(({ updateApp }) => updateApp())
	}, [])
}

// USAR TITULO Y DESCRIPCIÓN
export const useMetaTitle = (title: string) => {
	useEffect(() => {
		// ASIGNAR
		document.title = title
	}, [title])
}
