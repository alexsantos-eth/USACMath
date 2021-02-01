// TOOLS
import { useEffect } from 'react'
import { getAuth } from 'Utils/Auth'

// AUTH
const useAuth = (cb: (user: firebase.default.User | null) => unknown): void => {
	useEffect(() => {
		// LEER USUARIO
		const reqUser = async () => {
			const auth = await getAuth()
			if (auth) auth().onAuthStateChanged((user: firebase.default.User | null) => cb(user))
		}

		// PETICIÓN
		reqUser()
	}, [cb])
}

export default useAuth
