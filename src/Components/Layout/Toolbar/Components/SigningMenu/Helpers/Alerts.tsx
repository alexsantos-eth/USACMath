// REACT
import React from 'react'

// STRINGS
import { Es } from 'Env/Strings'

// COMPONENTES
import AdminSigning from '../Components/AdminSigning/AdminSigning'
import Spinner from '../Components/Spinner/Spinner'

// UTILS
import emailLoginEvent from './Auth'

// MOSTRAR ALERTA DE INICIO COMO ADMIN
const showAdminSigning = (lang: Es, callback: () => unknown): void => {
	//  DATOS
	let credentials: UserFormProps | null = null

	// GUARDAR DATOS
	const saveCredentials = (userCredentials: UserFormProps) => (credentials = userCredentials)

	// MENSAJE DE ERROR
	const errorEvent = () =>
		window.Alert({
			...lang.login.error,
			type: 'error',
			onHide: () => setTimeout(() => showAdminSigning(lang, callback), 300),
		})

	// INICIAR DATOS
	const loginEvent = (userCredentials?: UserFormProps) => {
		// ALERTA DE ESPERA
		window.Alert({
			...lang.login.wait,
			type: 'window',
			fixed: true,
			customElements: (
				<div
					style={{
						display: 'flex',
						height: '120px',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Spinner />
				</div>
			),
		})

		// INICIAR SESIÓN
		if (userCredentials)
			emailLoginEvent(userCredentials, errorEvent).then((cred) => (cred ? callback() : null))
		else if (credentials)
			emailLoginEvent(credentials, errorEvent).then((cred) => (cred ? callback() : null))
	}

	window.Alert({
		title: lang.login.title,
		body: lang.login.text,
		type: 'confirm',
		onConfirm: () => setTimeout(loginEvent, 300),
		customElements: <AdminSigning onChange={saveCredentials} onSubmit={loginEvent} />,
	})
}

export default showAdminSigning
