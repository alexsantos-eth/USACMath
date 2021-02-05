/* eslint-disable jsx-a11y/label-has-associated-control */
// REACT
import React from 'react'

// ESTILOS

// TIPOS
import { Link, useHistory } from 'react-router-dom'

// ICONOS
import G from 'Assets/icons/gicon.png'
import F from 'Assets/icons/ficon.png'

// HOOKS
import { useStrings, useUser } from 'Hooks/Context'

// GRID
import ROUTES from 'Env/Routes'
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
			<ul className={Styles.toolbar}>
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
				<Link to={ROUTES.files}>
					<li className={path === ROUTES.files ? Styles.pathActive : ''}>
						<i className='material-icons'>style</i>
						<span>Archivos</span>
					</li>
				</Link>
				<Link to={ROUTES.schedule}>
					<li className={path === ROUTES.schedule ? Styles.pathActive : ''}>
						<i className='material-icons'>event</i>
						<span>Horarios</span>
					</li>
				</Link>
				<li>
					<i className='material-icons'>devices</i>
					<span>Departamento</span>
				</li>
			</ul>
			<div className={Styles.logsContainer}>
				<button type='button' className={Styles.fLogin}>
					<img src={F} alt='Login Icon F' />
					Iniciar con Facebook
				</button>
				<button type='button' className={Styles.gLogin}>
					<img src={G} alt='Login Icon G' />
					Iniciar con Google
				</button>
			</div>
		</>
	)
}

export default Toolbar
