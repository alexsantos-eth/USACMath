// REACT
import React, { FC } from 'react'

// ESTILOS
import Styles from './Skeleton.module.scss'

// COMPONENTES
import CourseCard from './Components/CourseCard/CourseCard'

const Skeleton: FC = () => {
	return (
		<div className={Styles.container}>
			<CourseCard />
			<CourseCard />
			<CourseCard />
			<CourseCard />
		</div>
	)
}

export default Skeleton
