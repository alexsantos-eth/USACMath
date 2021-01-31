// REACT
import React from 'react'

// ESTILOS
import Style from './NotFound.module.scss'

// ASSETS
import NotFoundSVG from 'Assets/general/not-found.svg'

// HOOKS
import { useStrings } from 'Hooks/Context'

const NotFound = () => {
	// STRINGS
	const lang = useStrings()

	return (
		<div className={Style.container}>
			<div className={Style.info}>
				<h2>{lang.notFound.title}</h2>
				<p>{lang.notFound.text}</p>
			</div>
			<img src={NotFoundSVG} alt='Notfound' />
		</div>
	)
}

export default NotFound
