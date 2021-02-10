// REACT
import React from 'react'

// ESTILOS
import Style from './CourseCard.module.scss'

// COMPONENTES
import Header from './Components/Header/Header'
import CardInfo from './Components/CardInfo/CardInfo'
import CardActions from './Components/CardActions/CardActions'

// PROPIEDADES
interface CourseCardProps {
	course: CourseFile
	onPreview: (url: string) => unknown
	openPreviewRef: React.RefObject<HTMLInputElement>
}

const CourseCard: React.FC<CourseCardProps> = ({
	course,
	onPreview,
	openPreviewRef,
}: CourseCardProps) => {
	return (
		<>
			<div className={Style.file}>
				<Header title={course.title} text={course.text} />
				<CardInfo upload={course.upload} course={course.course} type={course.type} />
				<CardActions
					openPreviewRef={openPreviewRef}
					onPreview={onPreview}
					link={course.link}
					title={course.title}
					id={course.id}
				/>
			</div>
		</>
	)
}

export default CourseCard
