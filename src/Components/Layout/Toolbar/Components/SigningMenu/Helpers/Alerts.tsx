// REACT
import React from 'react'

// STRINGS
import { Es } from 'Env/Strings'

// COMPONENTES
import AdminSigning from '../Components/AdminSigning/AdminSigning'

// MOSTRAR ALERTA DE INICIO COMO ADMIN
const showAdminSigning = (lang: Es): void => {
	window.Alert({
		title: lang.login.title,
		body: lang.login.text,
		type: 'confirm',
		customElements: <AdminSigning />,
	})
}

export default showAdminSigning
