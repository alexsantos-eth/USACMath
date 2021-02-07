/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'
import sendQuickSearch from './Helpers/Search'

// ESTILOS
import Styles from './Navbar.module.scss'

// COMPONENTES
import Header from './Components/Header/Header'
import SearchBox from './Components/SearchBox/SearchBox'
import Drawer from './Components/Drawer/Drawer'

// PROPIEDADES
interface NavbarProps {
	onSearch: (ev: React.ChangeEvent<HTMLInputElement>) => unknown
	onQuickSearch: (word: string) => unknown
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onQuickSearch }: NavbarProps) => {
	// STRINGS
	const lang = useStrings()

	// REFERENCIAS
	const quickSearchToggle: React.RefObject<HTMLInputElement> = useRef(null)

	// ENVIAR BÚSQUEDAS RÁPIDAS
	const handleQuickSearch = (word: string) => {
		if (quickSearchToggle.current) quickSearchToggle.current.checked = false
		return sendQuickSearch(word, onQuickSearch)
	}

	return (
		<div className={Styles.navbar}>
			<div className={Styles.navContent}>
				{/* HEADER */}
				<Header />

				{/* BUSCADOR */}
				<SearchBox onSearch={onSearch} />

				{/* INPUT DE DRAWER */}
				<input type='checkbox' ref={quickSearchToggle} id='showList' className={Styles.showList} />

				{/* DRAWER */}
				<Drawer />

				{/* LISTA */}
				<label htmlFor='showList' className={Styles.searchList}>
					<ul>
						<li>{lang.application.short.listTitle}</li>
						{lang.application.short.buttons.map((e: { icon: string; text: string }) => (
							<button type='button' onClick={handleQuickSearch(e.text)} key={`quickList_${e.text}`}>
								<i className='material-icons'>{e.icon}</i> {e.text}
							</button>
						))}
					</ul>
				</label>
			</div>
		</div>
	)
}

export default Navbar
