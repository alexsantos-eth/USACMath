// REACT
import React from 'react'

// ESTILOS
import Styles from './Toolbar.module.scss'

// TIPOS
import { Link } from 'react-router-dom'

// ICONOS
import G from 'Assets/icons/gicon.png'
import F from 'Assets/icons/ficon.png'

// HOOKS
import { useStrings } from 'Hooks/Context'

// GRID
import { isDesktop } from 'Grids/Breakpoints'

const Toolbar: React.FC = () => {
	// STRING
	const lang = useStrings()

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
			<label htmlFor='showToolbar' className={Styles.toolbarShadow}></label>
			<ul className={Styles.toolbar}>
				{!isDesktop ? (
					<>
						<h1>{lang.application.toolbar.title}</h1>
						<p>{lang.application.toolbar.text}</p>
					</>
				) : (
					''
				)}
				<li className={Styles.logBtn} data-mod='login'>
					<i className='material-icons'>person</i>
					<span>Iniciar sesión</span>
				</li>
				<Link to='/'>
					<li>
						<i className='material-icons'>style</i>
						<span>Archivos</span>
					</li>
				</Link>
				<Link to='/horarios'>
					<li>
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
				<button className={Styles.fLogin}>
					<img src={F} alt='Login Icon F' />
					Iniciar con Facebook
				</button>
				<button className={Styles.gLogin}>
					<img src={G} alt='Login Icon G' />
					Iniciar con Google
				</button>
			</div>
		</>
	)
}

export default Toolbar
