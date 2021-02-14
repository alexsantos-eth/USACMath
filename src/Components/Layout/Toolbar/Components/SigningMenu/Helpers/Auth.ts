import { emailLogin } from 'Utils/Auth'

/**
 * Evento para iniciar con correo
 * @param  {UserFormProps} credentials
 * @param  {(error:string)=>unknown} onError?
 * @returns Promise<firebase.default.auth.UserCredential | void | null>
 */
const emailLoginEvent = async (
	credentials: UserFormProps,
	onError?: (error: string) => unknown
): Promise<firebase.default.auth.UserCredential | void | null> => {
	// VERIFICAR SI LOS DATOS EXISTEN
	if (credentials.email.length && credentials.password.length)
		return emailLogin(credentials.email, credentials.password, onError)

	// REGRESAR
	return null
}

export default emailLoginEvent
