import AuthErrorsJSON from 'Env/auth-errors.json'
import getCollection from './DB'

// ERRORES

// GLOBALES
let globalAuth: (() => firebase.default.auth.Auth) | null = null
let gProvider: firebase.default.auth.GoogleAuthProvider | null = null

// ERROR HANDLER
interface AuthErrorES {
	[index: string]: string
	'auth/user-not-found': string
}
const authErrors: AuthErrorES = AuthErrorsJSON
const authErrorHandler = (cb?: (message: string) => unknown) => (
	err: firebase.default.auth.AuthError
) => {
	// MENSAJE EN CONSOLA
	console.error('Ocurrió un error de auth')

	// SELECCIONAR ERROR
	if (err.code in authErrors && cb) cb(authErrors[err.code])
	else if (cb) cb(err.message)
}

// INSTANCIA DE AUTH
export const getAuth = async (): Promise<(() => firebase.default.auth.Auth) | null> => {
	const firebase = await import('Keys/firebase')
	await import('firebase/auth')

	// INSTANCIA
	if (globalAuth === null) {
		globalAuth = firebase.default.auth
		globalAuth().languageCode = 'es-GT'

		// PROVIDERS ( GOOGLE SOLO PARA INGENIERÍA )
		gProvider = new firebase.default.auth.GoogleAuthProvider()
		gProvider.setCustomParameters({ hd: 'ingenieria.usac.edu.gt' })
	}

	// LISTENER
	return globalAuth
}

// GUARDAR USUARIO EN FIRESTORE
const setUserFirestore = async (userData: Partial<User>, merge?: boolean) => {
	// REFERENCIA
	const col: firebase.default.firestore.CollectionReference = await getCollection('users')

	// GUARDAR
	const doc = col.doc(userData.uid)
	if (merge) return doc.set(userData, { merge })
	return doc.set(userData)
}

// GUARDAR USUARIO
const saveUser = (role?: 'student' | 'admin' | 'docent') => (
	credential: firebase.default.auth.UserCredential
) => {
	// VERIFICAR CREDENCIAL
	if (credential.user?.uid && credential.user.email)
		return setUserFirestore(
			{
				uid: credential.user?.uid,
				name: credential.user.displayName || '',
				email: credential.user.email,
				phone: credential.user?.phoneNumber || null,
				picture: credential.user?.photoURL || null,
				role: role || 'student',
			},
			true
		)
	return null
}

// INICIAR CON GOOGLE
export const googleSigning = async (onError?: (error: string) => unknown): Promise<void> => {
	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (auth && gProvider)
		auth()
			.signInWithPopup(gProvider)
			.then((res) => {
				if (res.credential && res.additionalUserInfo?.isNewUser) saveUser('student')(res)
			})
			.catch(authErrorHandler(onError))
}

// INICIAR CON CORREO Y CONTRASEÑA
export const emailLogin = async (
	email: string,
	password: string,
	onError?: (error: string) => unknown
): Promise<firebase.default.auth.UserCredential | void | null> => {
	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (auth && gProvider)
		return auth().signInWithEmailAndPassword(email, password).catch(authErrorHandler(onError))
	return null
}

// CERRAR SESIÓN
export const logout = async (): Promise<void | null> => {
	const auth = await getAuth()
	window.postMessage({
		action: 'logout',
	})
	if (auth) return auth().signOut()
	return null
}

// OBTENER USUARIO
export const getUser = async (uid?: string): Promise<User | null> => {
	// REFERENCIA
	const col: firebase.default.firestore.CollectionReference = await getCollection('users')
	if (uid) {
		const doc = col.doc(uid)
		const user = (await doc.get()).data() as User
		return user
	}
	return null
}
