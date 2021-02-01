// REACT
import { useEffect } from 'react'

// HOOK DE ANIMACIÓN
export const useAnimatedWidth = (setWidths: React.Dispatch<React.SetStateAction<number[]>>) => {
	useEffect(() => {
		// ANIMAR CADA 0.5S
		const intervals: NodeJS.Timeout = setInterval(() => {
			setWidths(
				Array(4)
					.fill(null)
					.map(() => Math.random() * 100)
			)
		}, 500)

		// BORRAR INTERVALO AL DESMONTAR
		return () => clearInterval(intervals)
	}, [setWidths])
}
