// REACT
import React from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// HOOKS
import { useHistory } from 'react-router-dom'

// ROTAS
import ROUTES from 'Env/Routes'

// TOOLS
import showAdminSigning from './Helpers/Alerts'

// ESTILOS
import Style from './SigningMenu.module.scss'

interface SigningMenuProps {
	className?: string
	sessionHandler: () => void
}

const SigningMenu: React.FC<SigningMenuProps> = ({
	className,
	sessionHandler,
}: SigningMenuProps) => {
	// STRINGS
	const lang = useStrings()

	// HISTORY
	const history = useHistory()

	// ALERTA DE INICIO DE SESIÓN
	const openAdminSigning = () => showAdminSigning(lang, () => history.push(ROUTES.schedule))

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
