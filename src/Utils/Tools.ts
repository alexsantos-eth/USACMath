import colors from 'Env/Globals'

/**
 * Cambiar de color global
 * @description formato (lightMode)(DarkMode )
 * @example color: var(--whiteDark)
 * @param  {IColor} selectedColor
 * @param  {boolean} dark
 */
const changeColor = (selectedColor: IColor, dark: boolean) => {
	// SELECCIONAR BODY
	const { body } = document

	// CAMBIAR PROPIEDAD
	body.style.setProperty(selectedColor.name, dark ? selectedColor.darkValue : selectedColor.value)
}

/**
 * Cambiar estado de darkmode
 */
export const toggleDarkMode = (): void => {
	// LEER VARIABLE GLOBAL
	const darkValue: boolean = window.localStorage.getItem('darkmode') === '1'

	// RECORRER CAMBIOS
	colors.forEach((color: IColor) => changeColor(color, darkValue))
}

/**
 * Normalizar string
 * @param  {string} str
 */
export const nfd = (str: string): string => {
	return str
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
}
