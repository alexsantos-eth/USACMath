// ENVIAR BÚSQUEDA RÁPIDA
export const sendQuickSearch = (
	word: string,
	onSearch: (ev: React.ChangeEvent<HTMLInputElement>) => any
) => () =>
	onSearch({
		// @ts-ignore
		target: {
			value: word,
		},
	})
