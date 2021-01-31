// BASE DE DATOS
import { getCollection } from './DB'

// OBTENER CURSOS
export const getCourses = async (): Promise<CourseFile[]> => {
	const coursesCol = await getCollection('files')
	const courses = (await coursesCol.get()).docs
		.map((doc) => doc.data().data)
		.flat()
		.sort((cFile: CourseFile, next: CourseFile) => {
			// OBTENER FECHAS
			const cUploads = cFile.upload.split('/')
			const nextUploads = next.upload.split('/')
			const currentDate = new Date(
				parseInt(cUploads[2]),
				parseInt(cUploads[1]),
				parseInt(cUploads[0])
			)
			const nextDate = new Date(
				parseInt(nextUploads[2]),
				parseInt(nextUploads[1]),
				parseInt(nextUploads[0])
			)

			// ORDENAR
			return nextDate.getTime() - currentDate.getTime()
		}) as CourseFile[]
	return courses
}
