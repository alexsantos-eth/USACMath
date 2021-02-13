// REACT
import { useEffect } from 'react'

// CAMBIOS EN AUTH
const useUserRoleListener = (
	recentLogged: React.MutableRefObject<boolean>,
	user: User | null,
	callback: (role: string) => unknown
): void => {
	const role = user?.role || 'student'
	useEffect(() => {
		if (recentLogged.current) callback(role)
	}, [role])
}

export default useUserRoleListener
