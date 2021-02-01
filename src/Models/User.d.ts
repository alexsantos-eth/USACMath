interface User {
	role?: 'admin' | 'user'
	uid: string
	email: string
	name: string
	phone: string | null
	picture: string | null
}
