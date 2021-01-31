import React, { useEffect, useState } from 'react'

// ESTILOS
import Style from './CourseCard.module.scss'

const CourseCard: React.FC = () => {
	// ESTADO
	const [widths, setWidths] = useState<number[]>([100, 100, 100, 100])

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
	})

	return (
		<div className={Style.preloader}>
			{widths.map((width: number, index: number) => (
				<span key={`skeleton_${index}`} style={{ width: `${width}%` }}></span>
			))}
			<div>
				<i></i>
				<i></i>
				<i></i>
			</div>
		</div>
	)
}

export default CourseCard
