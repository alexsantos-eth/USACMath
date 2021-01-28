// REACT
import React, { useState } from 'react'

// CONTEXT
import DarkModeContext from 'Context/Darkmode'

// HOOKS
import { useDarkmode } from 'Hooks/Fx'

const DarkmodeProvider = (props: React.ComponentProps<'div'>) => {
	// ESTADO
	const [darkmode, setDarkmode] = useState<boolean>(false)

	// HOOKS
	useDarkmode(setDarkmode)

	return <DarkModeContext.Provider value={{ darkmode }}>{props.children}</DarkModeContext.Provider>
}

export default DarkmodeProvider
