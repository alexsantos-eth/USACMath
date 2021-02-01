import React, { useState } from 'react'

// ESTILOS
import Style from './CourseCard.module.scss'
import { useAnimatedWidth } from './Helpers/Hooks'

const CourseCard: React.FC = () => {
	// ESTADO
	const [widths, setWidths] = useState<number[]>([100, 100, 100, 100])

	// HOOKS
	useAnimatedWidth(setWidths)

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
