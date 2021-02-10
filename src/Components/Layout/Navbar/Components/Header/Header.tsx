// REACT
import React from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Styles from './Header.module.scss'

const Header: React.FC = () => {
	// STRINGS
	const lang = useStrings()

	return (
		<div className={Styles.headerText}>
			<div className={Styles.headerContent}>
				<h1>{lang.application.general.title}</h1>
				<p className={Styles.headerIntroD}>{lang.application.general.main2}</p>
				<p className={Styles.headerIntroM}>{lang.application.general.main}</p>
			</div>
		</div>
	)
}

export default Header
