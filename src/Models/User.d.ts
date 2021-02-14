/**
 * Objeto de usuario
 * @property { uid } ID único de usuario
 * @property { email } Correo del usuario
 * @property { name } Nombre del usuario, generalmente en UPPERCASE
 * @property { phone } Numero del usuario ej: +5023567855
 * @property { role } Role dentro de la plataforma
 */
interface User {
	uid: string
	email: string
	name: string
	phone: string | null
	picture: string | null
	role: 'student' | 'admin' | 'docent'
}

/**
 * Propiedades para formulario de inicio de sesión
 * @property { email } Correo del usuario
 * @property { pass } Contraseña del usuario
 */
interface UserFormProps {
	[index: string]: string
	email: string
	password: string
}
