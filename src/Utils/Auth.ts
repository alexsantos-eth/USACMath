import { getCollection } from './DB'

// ERRORES
import AuthErrorsJSON from 'Env/auth-errors.json'

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
	console.log(err)
	console.error('Ocurrió un error de auth')

	// SELECCIONAR ERROR
	if (err.code in authErrors && cb) cb(authErrors[err.code])
	else if (cb) cb(err.message)
}

// INSTANCIA DE AUTH
export const getAuth = async () => {
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

// INICIAR CON GOOGLE
export const googleSigning = async (onError?: (error: string) => unknown) => {
	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (gProvider)
		auth()
			.signInWithPopup(gProvider)
			.then((res) => {
				// @ts-ignore
				window.localStorage.setItem('gToken', res.credential.accessToken)
				if (res.credential && res.additionalUserInfo?.isNewUser) saveUser()(res)
				window.postMessage({
					action: 'auth',
					data: res.credential,
				})
			})
			.catch(authErrorHandler(onError))
}

// CERRAR SESIÓN
export const logout = async () => {
	const auth = await getAuth()
	window.postMessage({
		action: 'logout',
	})
	return auth().signOut()
}

// GUARDAR USUARIO
const saveUser = (name?: string) => (credential: firebase.default.auth.UserCredential) => {
	// VERIFICAR CREDENCIAL
	if (credential.user?.uid && credential.user.email)
		return setUserFirestore(
			{
				uid: credential.user?.uid,
				name: name || credential.user.displayName || '',
				email: credential.user.email,
				phone: credential.user?.phoneNumber || null,
				picture: credential.user?.photoURL || null,
			},
			true
		)
}

// GUARDAR USUARIO EN FIRESTORE
const setUserFirestore = async (userData: Partial<User>, merge?: boolean) => {
	// REFERENCIA
	const col: firebase.default.firestore.CollectionReference = await getCollection('users')

	// GUARDAR
	const doc = col.doc(userData.uid)
	if (merge) return doc.set(userData, { merge })
	else return doc.set(userData)
}

// OBTENER USUARIO
export const getUser = async (uid?: string) => {
	// REFERENCIA
	const col: firebase.default.firestore.CollectionReference = await getCollection('users')
	if (uid) {
		const doc = col.doc(uid)
		const user = (await doc.get()).data() as User
		return user
	} else return null
}
