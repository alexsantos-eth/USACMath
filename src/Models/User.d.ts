interface User {
	uid: string
	email: string
	name: string
	phone: string | null
	picture: string | null
	role: 'student' | 'admin' | 'docent'
}

// PROPIEDADES DE AUTH
interface UserFormProps {
	[index: string]: string
	email: string
	password: string
}
