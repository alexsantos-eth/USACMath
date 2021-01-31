// REACT
import React, { useState } from 'react'

// ESTILOS
import Style from './CoursesList.module.scss'

// REACT WINDOW
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'
import { itemHeight, listHeight, listWidth } from './Helpers/ListSize'

// COMPONENTES
import CourseCard from './Components/CourseCard/CourseCard'
import NotFound from './Components/NotFound/NotFound'
import Skeleton from 'Components/Skeleton/Skeleton'

// HOOKS
import { useCourseFiles } from 'Hooks/Courses'

// TOOLS
import { nfd } from 'Utils/Tools'

// PROPIEDADES
interface CoursesListProps {
	search: string
}

const CoursesList = ({ search }: CoursesListProps) => {
	// ESTADOS
	const [courseFiles, setCourseFiles] = useState<CourseFile[]>([])

	// HOOK DE ARCHIVOS
	useCourseFiles(setCourseFiles)

	// FILTRAR CURSOS
	const nfdSearch: string = nfd(search)
	const filteredFiles: CourseFile[] = []
	for (let index = 0, length = courseFiles.length; index < length; index++) {
		if (
			nfd(
				courseFiles[index].title +
					courseFiles[index].text +
					courseFiles[index].course +
					courseFiles[index].link +
					courseFiles[index].type +
					courseFiles[index].upload
			).indexOf(nfdSearch) !== -1
		)
			filteredFiles.push(courseFiles[index])
	}

	if (courseFiles.length > 0)
		if (filteredFiles.length > 0)
			return (
				<div className={Style.container}>
					<List
						width={listWidth}
						height={listHeight}
						itemCount={filteredFiles.length}
						itemSize={itemHeight}>
						{({ style, index }: ListChildComponentProps) => {
							return (
								<div className={Style.itemContainer} style={style}>
									<CourseCard course={filteredFiles[index]} />
								</div>
							)
						}}
					</List>
				</div>
			)
		else
			return (
				<div className={Style.container}>
					<NotFound />
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
