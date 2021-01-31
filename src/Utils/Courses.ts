// BASE DE DATOS
import { getCollection } from './DB'

// OBTENER CURSOS
export const getCourses = async (): Promise<CourseArea[]> => {
	const coursesCol = await getCollection('courses')
	const courses = (await coursesCol.get()).docs.map((doc) => doc.data()) as CourseArea[]
	return courses
}
