// REACT
import React from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// COMPONENTES
import TextField from './Components/TextField/TextField'

// ESTILOS
import Styles from './AdminSigning.module.scss'

const AdminSigning: React.FC = () => {
	// STRINGS
	const lang = useStrings()

	return (
		<form className={Styles.container}>
			<TextField
				type='email'
				id='email'
				name='email'
				helper={lang.login.helpers[0]}
				label={lang.login.inputs[0]}
				className={Styles.emailInp}
				autoComplete='email'
				focuscolor='var(--blueLightBlue)'
			/>
			<TextField
				type='password'
				id='password'
				name='password'
				helper={lang.login.helpers[1]}
				label={lang.login.inputs[1]}
				autoComplete='current-password'
				focuscolor='var(--blueLightBlue)'
			/>
		</form>
	)
}

export default AdminSigning
