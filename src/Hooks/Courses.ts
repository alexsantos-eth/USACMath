// REACT
import { useEffect, Dispatch, SetStateAction } from 'react'
import getCourses from 'Utils/Courses'

// OBTENER CURSOS
const useCourseFiles = (setCourses: Dispatch<SetStateAction<CourseFile[]>>): void => {
	useEffect(() => {
		getCourses().then(setCourses)
	}, [setCourses])
}

export default useCourseFiles
