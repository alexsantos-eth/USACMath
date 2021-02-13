/* eslint-disable no-param-reassign */
// ASIGNAR DATOS
const setFieldData = (
	onChange: (credentials: UserFormProps) => unknown,
	userCredentials: React.MutableRefObject<UserFormProps>
) => (value: string, ev: React.ChangeEvent<HTMLInputElement>): void => {
	userCredentials.current[ev.target.name] = value
	onChange(userCredentials.current)
}

// ENVIAR DATOS
export const sendCredentials = (
	onSubmit: (credentials: UserFormProps) => unknown,
	userCredentials: React.MutableRefObject<UserFormProps>
) => (ev: React.FormEvent): void => {
	ev.preventDefault()
	if (userCredentials.current.email.length && userCredentials.current.password.length)
		onSubmit(userCredentials.current)
}

export default setFieldData
