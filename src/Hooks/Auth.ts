// TOOLS
import { useEffect } from 'react'
import { getAuth } from 'Utils/Auth'

/**
 * Este hook utiliza onAuthStateChanged en el parámetro cb
 * @param  {(user:firebase.default.User|null)=>unknown} cb
 */
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
