// REACT
import React from 'react'

// ESTILOS
import Styles from './Skeleton.module.scss'

// COMPONENTES
import CourseCard from './Components/CourseCard/CourseCard'

const Skeleton = () => {
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
