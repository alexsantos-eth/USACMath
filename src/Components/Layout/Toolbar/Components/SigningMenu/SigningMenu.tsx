// REACT
import React from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// TOOLS
import showAdminSigning from './Helpers/Alerts'

// ESTILOS
import Style from './SigningMenu.module.scss'

interface SigningMenuProps {
	className?: string
	sessionHandler: () => void
	callback: () => unknown
}

const SigningMenu: React.FC<SigningMenuProps> = ({
	className,
	sessionHandler,
	callback,
}: SigningMenuProps) => {
	// STRINGS
	const lang = useStrings()

	// ALERTA DE INICIO DE SESIÓN
	const openAdminSigning = () => showAdminSigning(lang, callback)

	return (
		<div className={`${Style.container} ${className}`}>
			<p>{lang.toolbar.options[0]}</p>
			<button type='button' className='material-icons' onClick={sessionHandler}>
				school <span>{lang.toolbar.signingMenu.options[0]}</span>
			</button>
			<button type='button' className='material-icons' onClick={openAdminSigning}>
				business_center <span>{lang.toolbar.signingMenu.options[1]}</span>
			</button>
		</div>
	)
}

// DEFAULT PROPS
SigningMenu.defaultProps = { className: '' }

export default SigningMenu
