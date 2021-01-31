import React, { useEffect } from 'react'

// ESTILOS
import Style from './CourseCard.module.scss'

const CourseCard: React.FC = () => {
	useEffect(() => {
		// OBTENER TODOS LOS LOADERS
		const span: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.loader')

		// AGREGAR ANCHO ALEATORIO
		const randomize = () =>
			span.forEach((el: HTMLSpanElement) => (el.style.width = Math.random() * 100 + '%'))

		// ANIMAR CADA 0.5S
		const intervals: NodeJS.Timeout = setInterval(randomize, 500)
		randomize()

		// BORRAR INTERVALO AL DESMONTAR
		return () => clearInterval(intervals)
	})

	return (
		<div className={Style.preloader}>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<div>
				<i></i>
				<i></i>
				<i></i>
			</div>
		</div>
	)
}

export default CourseCard
