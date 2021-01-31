// REACT
import React from 'react'

// ESTILOS
import Style from './NotFound.module.scss'

// ASSETS
import NotFoundSVG from 'Assets/general/not-found.svg'

const NotFound = () => {
	return (
		<div className={Style.container}>
			<img src={NotFoundSVG} alt='Notfound' />
		</div>
	)
}

export default NotFound
