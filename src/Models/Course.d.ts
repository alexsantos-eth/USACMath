interface CourseFile {
	course: string
	link: string
	text: string
	title: string
	type: string
	upload: string
}

interface CourseProps {
	title: string
	code: number
	section: string
	time: string
	root: string
	educator: string
	aux: string
}

interface CourseArea {
	subarea: string
	boss: string
	courses: CourseProps[]
}
interface CoursesDataContainer {
	data: CourseFile[]
}
