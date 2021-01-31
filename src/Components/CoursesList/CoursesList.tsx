// REACT
import React from 'react'

// ESTILOS
import Style from './CoursesList.module.scss'

// REACT WINDOW
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'
import { itemHeight, listHeight, listWidth } from './Helpers/ListSize'

// COMPONENTES
import CourseCard from './Components/CourseCard/CourseCard'

// PROPIEDADES
interface CoursesListProps {
	courses: CourseFile[]
}

const CoursesList = ({ courses }: CoursesListProps) => {
	return (
		<List width={listWidth} height={listHeight} itemCount={courses.length} itemSize={itemHeight}>
			{({ style, index }: ListChildComponentProps) => {
				return (
					<div className={Style.fileContainer} style={style}>
						<CourseCard course={courses[index]} />
					</div>
				)
			}}
		</List>
	)
}

export default CoursesList
