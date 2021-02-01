// REACT
import React, { useState } from 'react'

// CONTEXT
import DarkModeContext from 'Context/Darkmode'

// HOOKS
import { useLoadDarkmode } from 'Hooks/Fx'
import { toggleDarkMode } from 'Utils/Tools'

const DarkmodeProvider = ({ children }: React.ComponentProps<'div'>): JSX.Element => {
	// ESTADO
	const [darkmode, setDarkmode] = useState<boolean>(false)

	// HOOKS
	useLoadDarkmode(setDarkmode)

	// ACTUALIZAR DARKMODE
	const toggleStateDarkmode = () => {
		window.localStorage.setItem('darkmode', darkmode ? '0' : '1')
		toggleDarkMode()
		setDarkmode(!darkmode)
	}

	return (
		<DarkModeContext.Provider value={{ darkmode, setDarkmode: toggleStateDarkmode }}>
			{children}
		</DarkModeContext.Provider>
	)
}

export default DarkmodeProvider
