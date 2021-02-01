// REACT
import React, { ComponentProps, useState } from 'react'

// CONTEXT
import AuthContext from 'Context/Auth'
import useAuth from 'Hooks/Auth'
import { getUser } from 'Utils/Auth'

const AuthProvider = ({ children }: ComponentProps<'div'>): JSX.Element => {
	// ESTADO
	const [user, setUser] = useState<User | null>(null)

	// HOOKS
	useAuth((fireUser: firebase.default.User | null) => {
		if (fireUser) getUser(fireUser.uid).then(setUser)
		else setUser(null)
	})

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export default AuthProvider
