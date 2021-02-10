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
					<button type='button' onClick={sessionHandler}>
						<i className='material-icons'>person</i>
						<span>Iniciar sesión</span>
					</button>
				)}
				<div className={path === ROUTES.files ? Styles.pathActive : ''}>
					<Link to={ROUTES.files}>
						<i className='material-icons'>style</i>
						<span>Archivos</span>
					</Link>
				</div>
				<div className={path === ROUTES.schedule ? Styles.pathActive : ''}>
					<Link to={ROUTES.schedule}>
						<i className='material-icons'>event</i>
						<span>Horarios</span>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Toolbar
