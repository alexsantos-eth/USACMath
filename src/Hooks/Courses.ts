// REACT
import { useEffect } from 'react'
import { getCourses } from 'Utils/Courses'

// OBTENER CURSOS
export const useCourses = (setCourses: React.Dispatch<React.SetStateAction<CourseArea[]>>) => {
	useEffect(() => {
		getCourses().then(setCourses)
	}, [setCourses])
}
