// REACT
import React, { useRef } from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// COMPONENTES
import TextField from './Components/TextField/TextField'

// ESTILOS
import Styles from './AdminSigning.module.scss'
import setFieldData, { sendCredentials } from './Helpers/Form'

// PROPIEDADES
interface AdminSigningProps {
	onSubmit: (credentials: UserFormProps) => unknown
	onChange: (credentials: UserFormProps) => unknown
}

const AdminSigning: React.FC<AdminSigningProps> = ({ onSubmit, onChange }: AdminSigningProps) => {
	// STRINGS
	const lang = useStrings()

	// REFERENCIAS
	const userCredentials: React.MutableRefObject<UserFormProps> = useRef({ email: '', password: '' })

	// ASIGNAR DATOS
	const setFieldDataEv = setFieldData(onChange, userCredentials)

	// ENVIAR DATOS
	const sendCredentialsEv = sendCredentials(onSubmit, userCredentials)

	return (
		<form className={Styles.container} onSubmit={sendCredentialsEv}>
			<TextField
				type='email'
				id='email'
				name='email'
				helper={lang.login.helpers[0]}
				label={lang.login.inputs[0]}
				className={Styles.emailInp}
				onChange={setFieldDataEv}
				autoComplete='email'
				focusColor='var(--blueLightBlue)'
			/>
			<TextField
				type='password'
				id='password'
				name='password'
				helper={lang.login.helpers[1]}
				label={lang.login.inputs[1]}
				onChange={setFieldDataEv}
				autoComplete='current-password'
				focusColor='var(--blueLightBlue)'
			/>
		</form>
	)
}

export default AdminSigning
