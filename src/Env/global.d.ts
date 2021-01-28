type ShareData = {
	title?: string
	text?: string
	url?: string
}

interface Navigator {
	share: (data?: ShareData) => Promise<void>
}

// COLORES
interface IColor {
	name: string
	value: string
	darkValue: string
}
