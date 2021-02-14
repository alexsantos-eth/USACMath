// BASE DE DATOS
import getCollection from './DB'

/**
 * Obtener lista de cursos en DB
 */
const getCourses = async (): Promise<CourseFile[] | null> => {
	const coursesCol = await getCollection('files')
	const coursesDoc = coursesCol.doc('documents')
	const coursesData = (await coursesDoc.get()).data() as CoursesDataContainer

	if (coursesData) {
		const courses = coursesData.data.sort((cFile: CourseFile, next: CourseFile) => {
			// OBTENER FECHAS
			const cUploads = cFile.upload.split('/')
			const nextUploads = next.upload.split('/')
			const currentDate = new Date(
				parseInt(cUploads[2], 10),
				parseInt(cUploads[1], 10),
				parseInt(cUploads[0], 10)
			)
			const nextDate = new Date(
				parseInt(nextUploads[2], 10),
				parseInt(nextUploads[1], 10),
				parseInt(nextUploads[0], 10)
			)

			// ORDENAR
			return nextDate.getTime() - currentDate.getTime()
		}) as CourseFile[]
		return courses
	}
	return null
}

export default getCourses
