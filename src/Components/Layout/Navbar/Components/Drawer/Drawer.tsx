// REACT
import React from 'react'

// HOOKS
import { useStrings, useSetDarkmode, useDarkmode } from 'Hooks/Context'

// ESTILOS
import Styles from './Drawer.module.scss'

const Drawer: React.FC = () => {
	// STRINGS
	const lang = useStrings()

	// ASIGNAR DARKMODE
	const setDarkmodeCtx: (darkmode: boolean) => void = useSetDarkmode()

	// LEER DARKMODE
	const darkmode: boolean = useDarkmode()

	// CAMBIAR DARKMODE
	const toggleDarkmode = () => setDarkmodeCtx(!darkmode)

	return (
		<div className={Styles.navTools}>
			<label htmlFor='showList' className={Styles.showSearchList}>
				<i className='material-icons'>flash_on</i>
				{lang.application.buttons.advancedSearch}
			</label>
			<button type='button' className={Styles.darkMode} onClick={toggleDarkmode}>
				<i className='material-icons '>brightness_medium</i>
			</button>
		</div>
	)
}

export default Drawer
