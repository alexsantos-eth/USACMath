/* eslint-disable no-param-reassign */

/**
 * Guardar datos desde formulario
 * @param  {(credentials:UserFormProps)=>unknown} onChange
 * @param  {React.MutableRefObject<UserFormProps>} userCredentials
 * @returns void
 */
const setFieldData = (
	onChange: (credentials: UserFormProps) => unknown,
	userCredentials: React.MutableRefObject<UserFormProps>
) => (value: string, ev: React.ChangeEvent<HTMLInputElement>): void => {
	userCredentials.current[ev.target.name] = value
	onChange(userCredentials.current)
}

/**
 * Enviar datos al formulario
 * @param  {(credentials:UserFormProps)=>unknown} onSubmit
 * @param  {React.MutableRefObject<UserFormProps>} userCredentials
 * @returns void
 */
export const sendCredentials = (
	onSubmit: (credentials: UserFormProps) => unknown,
	userCredentials: React.MutableRefObject<UserFormProps>
) => (ev: React.FormEvent): void => {
	ev.preventDefault()
	if (userCredentials.current.email.length && userCredentials.current.password.length)
		onSubmit(userCredentials.current)
}

export default setFieldData
