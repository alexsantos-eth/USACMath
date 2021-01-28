import React from 'react'

// ESTILOS
import Styles from './Navbar.module.scss'

const Navbar: React.FC = () => {
	return (
		<div className={Styles.navbar}>
			<div className={Styles.navContent}>
				{/* HEADER */}
				<div className={Styles.headerText}>
					<div className={Styles.headerContent}>
						<h1>{''}</h1>
						<p>{''}</p>
					</div>
				</div>

				{/* BUSCADOR */}
				<div className={Styles.searchBox}>
					<label className='material-icons' htmlFor='search'>
						search
					</label>
					<input type='search' className={Styles.search} id='search' name='search' placeholder='' />
				</div>

				{/* INPUT DE DRAWER */}
				<input type='checkbox' id='showList' className={Styles.showList}></input>

				{/* DRAWER */}
				<div className={Styles.navTools}>
					<label htmlFor='showList' className={Styles.showSearchList}>
						<i className='material-icons'>flash_on</i>
						{''}
					</label>
					<button className={Styles.darkMode}>
						<i className='material-icons '>brightness_medium</i>
					</button>
				</div>

				{/* LISTA */}
				<label htmlFor='showList' className={Styles.searchLst}>
					<ul>
						<li>{''}</li>
					</ul>
				</label>
			</div>
		</div>
	)
}

export default Navbar
