// REACT
import React from 'react'

// ESTILOS
import Styles from './Spinner.module.scss'

const Spinner: React.FC = () => {
	return (
		<div className={Styles.spinner}>
			<div className={Styles.dot1} />
			<div className={Styles.dot2} />
		</div>
	)
}

export default Spinner
