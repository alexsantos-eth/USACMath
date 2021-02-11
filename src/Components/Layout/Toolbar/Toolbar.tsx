/* eslint-disable jsx-a11y/label-has-associated-control */
// REACT
import React from 'react'

// TIPOS
import { Link, useHistory } from 'react-router-dom'

// HOOKS
import { useStrings, useUser } from 'Hooks/Context'

// GRID
import ROUTES from 'Env/Routes'

// ESTILOS
import Styles from './Toolbar.module.scss'

// HELPERS
import handleUserSession from './Helpers/User'

// COMPONENTES
import SigningMenu from './Components/SigningMenu/SigningMenu'

const Toolbar: React.FC = () => {
	// STRING
	const lang = useStrings()

	// USER
	const user = useUser()

	// INICIAR/CERRAR SESSION
	const sessionHandler = () => handleUserSession(user, lang)

	// HISTORY
	const history = useHistory()
	const path: string = history.location.pathname

	return (
		<>
			<input
				className={Styles.showToolbar}
				id='showToolbar'
				type='checkbox'
				style={{ display: 'none' }}
			/>
			<label htmlFor='showToolbar' className={Styles.showToolbar}>
				<i className='material-icons'>more_vert</i>
			</label>
			<label htmlFor='showToolbar' className={Styles.toolbarShadow} />
			<div className={Styles.toolbar}>
				<input
					type='checkbox'
					id='openSigning'
					className={Styles.openSigning}
					style={{ display: 'none' }}
				/>
				<div className={Styles.toolbarHeader}>
					<h1>{lang.application.toolbar.title}</h1>
					<p>{lang.application.toolbar.text}</p>
				</div>
				{user ? (
					<button type='button' className={Styles.logBtn} onClick={sessionHandler}>
						<img src={user.picture || ''} alt='User pic' />
						<span style={{ textTransform: 'capitalize' }}>
							{user.name.split(' ')[0].toLowerCase()} {user.name.split(' ')[2].toLowerCase()}
						</span>
					</button>
				) : (
					<label htmlFor='openSigning' className={Styles.signBtn}>
						<i className='material-icons'>person</i>
						<span>{lang.toolbar.options[0]}</span>
						<i className='material-icons'>arrow_drop_down</i>
						<SigningMenu className={Styles.signingMenu} sessionHandler={sessionHandler} />
					</label>
				)}
				<div className={path === ROUTES.files ? Styles.pathActive : ''}>
					<Link to={ROUTES.files}>
						<i className='material-icons'>style</i>
						<span>{lang.toolbar.options[1]}</span>
					</Link>
				</div>
				<div className={path === ROUTES.schedule ? Styles.pathActive : ''}>
					<Link to={ROUTES.schedule}>
						<i className='material-icons'>event</i>
						<span>{lang.toolbar.options[2]}</span>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Toolbar
