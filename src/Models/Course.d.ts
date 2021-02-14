/**
 * Objeto de archivo de curso
 * @property { course } Tipo de curso ej: Mate intermedia 3
 * @property { link } Link de archivo
 * @property { title } Titulo del archivo
 * @property { type } Tipo de archivo ej: Horario
 * @property { upload } Fecha de subida
 * @property { id } Correlativo del archivo
 */
interface CourseFile {
	course: string
	link: string
	text: string
	title: string
	type: string
	upload: string
	id: number
}

/**
 * Objeto de curso para horario de cursos
 * @property { title } Nombre del curso
 * @property { code } Código del curso
 * @property { section } Sección del curso
 * @property { time } Horario del curso
 * @property { root } Salon del curso
 * @property { educator } Nombre del docente asignado
 * @property { aux } Nombre del auxiliar del curso
 */
interface CourseProps {
	title: string
	code: number
	section: string
	time: string
	root: string
	educator: string
	aux: string
}

/**
 * Area de horarios
 * @property { subarea } Subarea correspondiente
 * @property { boss } Nombre de jefe de area
 * @property { courses } Lista de cursos
 */
interface CourseArea {
	subarea: string
	boss: string
	courses: CourseProps[]
}

/**
 * Lista de cursos (Horarios)
 * @property { data } Lista de cursos
 */
interface CoursesDataContainer {
	data: CourseFile[]
}
