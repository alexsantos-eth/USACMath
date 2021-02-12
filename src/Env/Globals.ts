const toCamelCase = (text: string) => text.replace(text.charAt(0), text.charAt(0).toUpperCase())

// COLORES
interface IPColor {
	name: string
	value: string
}

// COLORES PRIMARIOS
const primaryColors: IPColor[] = [
	{ name: '--blue', value: '#1976d2' },
	{ name: '--light', value: '#eee' },
	{ name: '--lightGray', value: '#aaa' },
	{ name: '--gray', value: '#777' },
	{ name: '--blueGray', value: '#607d8b' },
	{ name: '--lightBlue', value: '#03A9F4' },
	{ name: '--blueDarkGray', value: '#455a64' },
	{ name: '--blueDeepGray', value: '#263238' },
	{ name: '--black', value: 'rgba(0, 0, 0, 0.8)' },
	{ name: '--white', value: '#fff' },
	{ name: '--darkGray', value: '#555' },
]

// COLORES INMUTABLES
const baseColors: IColor[] = []

// PERMUTACIÓN DE COLORES
const colorPer: IColor[] = []

// RECORRER COLORES
primaryColors.forEach((pColor: IPColor) => {
	// RECORRER COLORES
	primaryColors.forEach((pSColor: IPColor) =>
		colorPer.push({
			name:
				pColor.name === pSColor.name
					? pColor.name
					: `${pColor.name}${toCamelCase(pSColor.name.substr(2))}`,
			value: pColor.value,
			darkValue: pSColor.value,
		})
	)
})

// COLORES FINALES
const colors: IColor[] = baseColors.concat(colorPer)

// EXPORTACIONES
export default colors
