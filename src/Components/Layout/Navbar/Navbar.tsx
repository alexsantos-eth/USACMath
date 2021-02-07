/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react'

// ESTILOS
import Styles from './Navbar.module.scss'

// COMPONENTES
import Header from './Components/Header/Header'
import SearchBox from './Components/SearchBox/SearchBox'
import Drawer from './Components/Drawer/Drawer'
import QuickList from './Components/QuickList/QuickList'

// PROPIEDADES
interface NavbarProps {
	onSearch: (ev: React.ChangeEvent<HTMLInputElement>) => unknown
	onQuickSearch: (word: string) => unknown
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onQuickSearch }: NavbarProps) => {
	// REFERENCIAS
	const quickSearchToggle: React.RefObject<HTMLInputElement> = useRef(null)

	// OCULTAR BÚSQUEDA RÁPIDA
	const toggleQuickSearch = () => {
		if (quickSearchToggle.current) quickSearchToggle.current.checked = false
	}

	return (
		<div className={Styles.navbar}>
			<div className={Styles.navContent}>
				<Header />
				<SearchBox onSearch={onSearch} />
				<input type='checkbox' ref={quickSearchToggle} id='showList' className={Styles.showList} />
				<Drawer />
				<QuickList
					quickSearchToggle={quickSearchToggle}
					onQuickSearch={onQuickSearch}
					toggleQuickSearch={toggleQuickSearch}
				/>
			</div>
		</div>
	)
}

export default Navbar
