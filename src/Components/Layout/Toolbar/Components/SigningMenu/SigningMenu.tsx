// REACT
import React from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

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

	return (
		<div className={`${Style.container} ${className}`}>
			<p>{lang.toolbar.options[0]}</p>
			<button type='button' className='material-icons' onClick={sessionHandler}>
				school <span>{lang.toolbar.signingMenu.options[0]}</span>
			</button>
			<button type='button' className='material-icons'>
				business_center <span>{lang.toolbar.signingMenu.options[1]}</span>
			</button>
		</div>
	)
}

// DEFAULT PROPS
SigningMenu.defaultProps = { className: '' }

export default SigningMenu
