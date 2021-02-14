// REACT
import { useEffect } from 'react'

/**
 * Escuchar cambios de role y asignar al callback
 * @param  {React.MutableRefObject<boolean>} recentLogged
 * @param  {User|null} user
 * @param  {(role:string)=>unknown} callback
 */
const useUserRoleListener = (
	recentLogged: React.MutableRefObject<boolean>,
	user: User | null,
	callback: (role: string) => unknown
): void => {
	// ROLE
	const role = user?.role || 'student'

	// HOOK
	useEffect(() => {
		if (recentLogged.current) callback(role)
	}, [role])
}

export default useUserRoleListener
