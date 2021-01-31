import React from 'react'

// ESTILOS
import Styles from './Navbar.module.scss'

// HOOKS
import { useSetDarkmode, useStrings, useDarkmode } from 'Hooks/Context'

// PROPIEDADES
interface NavbarProps {
	onSearch: (ev: React.ChangeEvent<HTMLInputElement>) => unknown
}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
	// STRINGS
	const lang = useStrings()

	// DARKMODE
	const setDarkmodeCtx: (darkmode: boolean) => void = useSetDarkmode()
	const darkmode: boolean = useDarkmode()

	// CAMBIAR DARKMODE
	const toggleDarkmode = () => setDarkmodeCtx(!darkmode)

	return (
		<div className={Styles.navbar}>
			<div className={Styles.navContent}>
				{/* HEADER */}
				<div className={Styles.headerText}>
					<div className={Styles.headerContent}>
						<h1>{lang.application.general.title}</h1>
						<p className={Styles.headerIntroD}>{lang.application.general.main_2}</p>
						<p className={Styles.headerIntroM}>{lang.application.general.main}</p>
					</div>
				</div>

				{/* BUSCADOR */}
				<div className={Styles.searchBox}>
					<label className='material-icons' htmlFor='search'>
						search
					</label>
					<input
						type='search'
						className={Styles.search}
						id='search'
						name='search'
						onChange={props.onSearch}
						placeholder={lang.application.placeholders.search}
					/>
				</div>

				{/* INPUT DE DRAWER */}
				<input type='checkbox' id='showList' className={Styles.showList}></input>

				{/* DRAWER */}
				<div className={Styles.navTools}>
					<label htmlFor='showList' className={Styles.showSearchList}>
						<i className='material-icons'>flash_on</i>
						{lang.application.buttons.advancedSearch}
					</label>
					<button className={Styles.darkMode} onClick={toggleDarkmode}>
						<i className='material-icons '>brightness_medium</i>
					</button>
				</div>

				{/* LISTA */}
				<label htmlFor='showList' className={Styles.searchList}>
					<ul>
						<li>{lang.application.short.listTitle}</li>
						{lang.application.short.buttons.map((e: { icon: string; text: string }, i: number) => (
							<li key={`quickList_${i}`}>
								<i className='material-icons'>{e.icon}</i> {e.text}
							</li>
						))}
					</ul>
				</label>
			</div>
		</div>
	)
}

export default Navbar
