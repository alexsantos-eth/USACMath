// REACT
import { useEffect } from 'react'
import { getCourses } from 'Utils/Courses'

// OBTENER CURSOS
export const useCourseFiles = (setCourses: React.Dispatch<React.SetStateAction<CourseFile[]>>) => {
	useEffect(() => {
		getCourses().then(setCourses)
	}, [setCourses])
}
