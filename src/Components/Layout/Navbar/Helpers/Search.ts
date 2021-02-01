// ENVIAR BÚSQUEDA RÁPIDA
const sendQuickSearch = (word: string, onSearch: (searchWord: string) => unknown) => (): unknown =>
	onSearch(word)

export default sendQuickSearch
