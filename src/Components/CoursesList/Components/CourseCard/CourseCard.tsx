// REACT
import React from 'react'

// ESTILOS
import { useStrings } from 'Hooks/Context'
import Style from './CourseCard.module.scss'

// HOOKS
import shareFile from './Helpers/Tools'

// PROPIEDADES
interface CourseCardProps {
	course: CourseFile
}

const CourseCard: React.FC<CourseCardProps> = ({ course }: CourseCardProps) => {
	// STRINGS
	const lang = useStrings()

	// COMPARTIR DOCUMENTO
	const handleShareFile = (url: string) => () => shareFile(url, lang)

	return (
		<>
			<div className={Style.file}>
				<div className={Style.fileHead}>
					<h1>{course.title}</h1>
					<p>{course.text}</p>
				</div>

				<div className={Style.fileMiddle}>
					<ul>
						<li>
							<i>{lang.course.labels[0]}:</i>
							<span>{course.upload}</span>
						</li>
						<li>
							<i>{lang.course.labels[1]}:</i>
							<span>{course.course}</span>
						</li>
						<li>
							<i>{lang.course.labels[2]}:</i>
							<span>{course.type}</span>
						</li>
					</ul>
				</div>

				<div className={Style.fileBody}>
					<div className={Style.actions}>
						<button type='button' className={Style.action}>
							<i data-link={course.link} className='material-icons'>
								visibility
							</i>
						</button>
						<button type='button' onClick={handleShareFile(course.link)} className={Style.action}>
							<i data-link={course.link} className='material-icons'>
								share
							</i>
						</button>
						<button type='button' className={Style.action}>
							<i data-file={course.title} className='material-icons'>
								comment
							</i>
						</button>
					</div>

					<a href={course.link} title={course.title} download>
						<i className='material-icons'>arrow_downward</i> {lang.course.download}
					</a>
				</div>
			</div>
		</>
	)
}

export default CourseCard
