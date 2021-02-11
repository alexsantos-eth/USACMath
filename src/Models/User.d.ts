interface User {
	uid: string
	email: string
	name: string
	phone: string | null
	picture: string | null
	role: 'student' | 'admin' | 'docent'
}
