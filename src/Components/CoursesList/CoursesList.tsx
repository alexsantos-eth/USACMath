// REACT
import React, { useState } from 'react'

// ESTILOS
import Style from './CoursesList.module.scss'

// REACT WINDOW
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'
import { itemHeight, listHeight, listWidth } from './Helpers/ListSize'

// COMPONENTES
import CourseCard from './Components/CourseCard/CourseCard'
import Skeleton from 'Components/Skeleton/Skeleton'

// HOOKS
import { useCourseFiles } from 'Hooks/Courses'

const CoursesList = () => {
	// ESTADOS
	const [courseFiles, setCourseFiles] = useState<CourseFile[]>([])

	// HOOK DE ARCHIVOS
	useCourseFiles(setCourseFiles)

	if (courseFiles.length > 0)
		return (
			<div className={Style.container}>
				<List
					width={listWidth}
					height={listHeight}
					itemCount={courseFiles.length}
					itemSize={itemHeight}>
					{({ style, index }: ListChildComponentProps) => {
						return (
							<div className={Style.itemContainer} style={style}>
								<CourseCard course={courseFiles[index]} />
							</div>
						)
					}}
				</List>
			</div>
		)
	else
		return (
			<div className={Style.container}>
				<Skeleton />
			</div>
		)
}

export default CoursesList
