// REACT
import { useEffect, Dispatch, SetStateAction } from 'react'

/**
 * Hook para generar widths (%) aleatorios
 * @param  {Dispatch<SetStateAction<number[]>>} setWidths
 */
const useAnimatedWidth = (setWidths: Dispatch<SetStateAction<number[]>>): void => {
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

export default useAnimatedWidth
