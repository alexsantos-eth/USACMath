/* eslint-disable jsx-a11y/label-has-associated-control */
// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './TexField.module.scss'

interface TextFieldProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
	label?: string
	helper?: string
	focuscolor?: string
	onHelperClick?: () => unknown
	onChange?: (value: string, ev: React.ChangeEvent<HTMLInputElement>) => unknown
}

const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
	// ESTADO
	const [showPassword, setShowPassword] = useState<string>('password')

	// PROPS
	const { id, label, className, onChange, type, focuscolor, helper, onHelperClick } = props

	// ENVIAR DATOS
	const sendText = (ev: React.ChangeEvent<HTMLInputElement>) =>
		onChange && onChange(ev.target.value, ev)

	// CAMBIAR TIPO DE INPUT
	const toggleInputType = () => setShowPassword(showPassword === 'password' ? 'text' : 'password')

	return (
		<div
			className={`${Styles.container} ${className}`}
			style={{ ['--focuscolor' as string]: focuscolor }}>
			<input
				{...props}
				placeholder=' '
				className={undefined}
				onChange={sendText}
				type={type === 'password' ? showPassword : type}
			/>
			<label htmlFor={id}>
				<span>{label}</span>
				<i
					style={onHelperClick ? { cursor: 'pointer' } : undefined}
					role='presentation'
					onClick={onHelperClick}>
					{helper}
				</i>
			</label>
			{type === 'password' && (
				<button type='button' onClick={toggleInputType} className='material-icons'>
					{`visibility${showPassword === 'password' ? '' : '_off'}`}
				</button>
			)}
		</div>
	)
}

TextField.defaultProps = {
	label: '',
	helper: '',
	onChange: undefined,
	onHelperClick: undefined,
	focuscolor: 'var(--blue)',
}

export default TextField
