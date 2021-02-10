// REACT
import React from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Styles from './SearchBox.module.scss'

interface SearchBoxProps {
	onSearch: (ev: React.ChangeEvent<HTMLInputElement>) => unknown
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }: SearchBoxProps) => {
	// STRINGS
	const lang = useStrings()

	return (
		<div className={Styles.searchBox}>
			<label className='material-icons' htmlFor='search'>
				search
			</label>
			<input
				type='search'
				className={Styles.search}
				id='search'
				name='search'
				onChange={onSearch}
				placeholder={lang.application.placeholders.search}
			/>
		</div>
	)
}

export default SearchBox
