/**
 * Concurrencia para mostrar búsqueda
 * @param  {string} word
 * @param  {(searchWord:string)=>unknown} onSearch
 */
const sendQuickSearch = (word: string, onSearch: (searchWord: string) => unknown) => (): unknown =>
	onSearch(word)

export default sendQuickSearch
