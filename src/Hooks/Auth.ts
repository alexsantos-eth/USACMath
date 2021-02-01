// TOOLS
import { useEffect } from 'react'
import { getAuth } from 'Utils/Auth'

// AUTH
export const useAuth = async (cb: (user: firebase.default.User | null) => unknown) => {
	useEffect(() => {
		// LEER USUARIO
		const reqUser = async () => {
			const auth = await getAuth()
			auth().onAuthStateChanged((user: firebase.default.User | null) => cb(user))
		}

		// PETICIÓN
		reqUser()
	}, [cb])
}
