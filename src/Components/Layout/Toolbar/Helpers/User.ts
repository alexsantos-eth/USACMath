import { Es } from 'Env/Strings'
import { googleSigning, logout } from 'Utils/Auth'

/**
 * Cierra o inicia sesión
 * @param  {User|null} user
 * @param  {Es} lang
 * @returns void
 */
const handleUserSession = (user: User | null, lang: Es): void => {
	if (user)
		window.Alert({
			title: lang.login.logoutTitle,
			body: lang.login.logoutText,
			type: 'confirm',
			onConfirm: () => logout(),
		})
	else googleSigning()
}

export default handleUserSession
