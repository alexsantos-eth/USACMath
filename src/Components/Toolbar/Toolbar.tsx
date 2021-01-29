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
			<button className={Styles.showToolbar}>
				<i className='material-icons'>more_vert</i>
			</button>
			<div className={Styles.toolbarShadow}></div>
			<ul className={Styles.toolbar}>
				{!isDesktop ? (
					<>
						<h1>{lang.application.toolbar.title}</h1>
						<p>{lang.application.toolbar.text}</p>
					</>
				) : (
					''
				)}
				<li className={Styles.logBtn} data-mod='login' data-tooltip={'Iniciar sesión'}>
					{
						<i data-mod='login' className='material-icons'>
							person
						</i>
					}
				</li>
				<Link to='/'>
					<li data-tooltip='Archivos'>
						<i className='material-icons'>style</i>
					</li>
				</Link>
				<Link to='/horarios'>
					<li data-tooltip='Horarios'>
						<i className='material-icons'>event</i>
					</li>
				</Link>
				<li data-mod='mainPage' data-tooltip='Departamento'>
					<i data-mod='mainPage' className='material-icons'>
						devices
					</i>
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
