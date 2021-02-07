// REACT
import React, { FC } from 'react'

// ASSETS
import NotFoundSVG from 'Assets/general/not-found.svg'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Style from './NotFound.module.scss'

const NotFound: FC = () => {
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
