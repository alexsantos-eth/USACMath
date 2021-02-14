// REACT
import { useEffect, Dispatch, SetStateAction } from 'react'
import getCourses from 'Utils/Courses'

/**
 * Hook para obtener todos los cursos de la DB
 * @param  {Dispatch<SetStateAction<CourseFile[]|null>>} setCourses

 */
const useCourseFiles = (setCourses: Dispatch<SetStateAction<CourseFile[] | null>>): void => {
	useEffect(() => {
		getCourses().then(setCourses)
	}, [setCourses])
}

export default useCourseFiles
