import React, { useState } from 'react'

// HOOKS
import useAnimatedWidth from 'Components/Skeleton/Helpers/Hooks'

// ESTILOS
import Style from './CourseCard.module.scss'

const CourseCard: React.FC = () => {
	// ESTADO
	const [widths, setWidths] = useState<number[]>([100, 100, 100, 100])

	// HOOKS
	useAnimatedWidth(setWidths)

	return (
		<div className={Style.preloader}>
			<span style={{ width: `${widths[0]}%` }} />
			<span style={{ width: `${widths[1]}%` }} />
			<span style={{ width: `${widths[2]}%` }} />
			<span style={{ width: `${widths[3]}%` }} />
			<div>
				<i />
				<i />
				<i />
			</div>
		</div>
	)
}

export default CourseCard
