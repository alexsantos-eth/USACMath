// REACT
import React, { ComponentProps, useState } from 'react'

// CONTEXT
import AuthContext from 'Context/Auth'
import { useAuth } from 'Hooks/Auth'
import { getUser } from 'Utils/Auth'

const AuthProvider = (props: ComponentProps<'div'>) => {
	// ESTADO
	const [user, setUser] = useState<User | null>(null)

	// HOOKS
	useAuth((user: firebase.default.User | null) => {
		if (user) getUser(user.uid).then(setUser)
		else setUser(null)
	})

	return <AuthContext.Provider value={{ user }}>{props.children}</AuthContext.Provider>
}

export default AuthProvider
