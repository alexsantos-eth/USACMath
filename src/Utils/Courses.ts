// BASE DE DATOS
import { getCollection } from './DB'

// OBTENER CURSOS
export const getCourses = async (): Promise<CourseFile[]> => {
	const coursesCol = await getCollection('files')
	const courses = (await coursesCol.get()).docs.map((doc) => doc.data().data).flat() as CourseFile[]
	return courses
}
