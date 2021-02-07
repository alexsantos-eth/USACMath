// REACT
import React from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Styles from './QuickList.module.scss'

// HELPERS
import sendQuickSearch from '../../Helpers/Search'

// PROPIEDADES
interface QuickListProps {
	quickSearchToggle: React.RefObject<HTMLInputElement>
	onQuickSearch: (word: string) => unknown
	toggleQuickSearch: () => unknown
}

const QuickList: React.FC<QuickListProps> = ({
	quickSearchToggle,
	onQuickSearch,
	toggleQuickSearch,
}: QuickListProps) => {
	// STRINGS
	const lang = useStrings()

	// ENVIAR BÚSQUEDAS RÁPIDAS
	const handleQuickSearch = (word: string) => {
		if (quickSearchToggle.current) toggleQuickSearch()
		return sendQuickSearch(word, onQuickSearch)
	}

	return (
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
	)
}

export default QuickList
