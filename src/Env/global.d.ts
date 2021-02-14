/**
 * Objeto para ShareAPI
 * @property { title? } Titulo de enlace
 * @property { text? } Contenido de enlace
 * @property { url? } Dirección de enlace
 */
type ShareData = {
	title?: string
	text?: string
	url?: string
}

/**
 * Agregar compatibilidad con ShareAPI
 */
interface Navigator {
	share: (data?: ShareData) => Promise<void>
}

/**
 * Objeto de color
 * @property { name } Nombre del color ej: blue
 * @property { value } Valor del color ej: hex, rgba, hsl
 * @property { darkValue } Valor en darkmode del color ej: hex, rgba, hsl
 */
interface IColor {
	name: string
	value: string
	darkValue: string
}
