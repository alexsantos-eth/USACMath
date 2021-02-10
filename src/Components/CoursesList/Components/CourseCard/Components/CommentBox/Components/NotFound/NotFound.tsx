// REACT
import React from 'react'

// ASSETS
import NotFoundSVG from 'Assets/general/comment-not-found.svg'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Style from './NotFound.module.scss'

const NotFound: React.FC = () => {
	// STRINGS
	const lang = useStrings()

	return (
		<div className={Style.container}>
			<h2>{lang.comments.notFound}</h2>
			<p>{lang.comments.notFoundText}</p>
			<img src={NotFoundSVG} alt='NotFound' />
		</div>
	)
}

export default NotFound
