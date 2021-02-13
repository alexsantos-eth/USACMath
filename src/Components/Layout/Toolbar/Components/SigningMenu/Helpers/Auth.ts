import { emailLogin } from 'Utils/Auth'

// INICIAR SESIÓN
const emailLoginEvent = async (
	credentials: UserFormProps,
	onError?: (error: string) => unknown
): Promise<firebase.default.auth.UserCredential | void | null> => {
	if (credentials.email.length && credentials.password.length)
		return emailLogin(credentials.email, credentials.password, onError)

	return null
}

export default emailLoginEvent
