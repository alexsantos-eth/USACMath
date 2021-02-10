/* eslint-disable no-console */
const listWidth: number = window.innerWidth <= 515 ? window.innerWidth - 120 : 395
export default listWidth

export const getItemSize = (comments: FileComment[]) => (index: number): number => {
	// GENERAR ALTO
	const { comment } = comments[index]
	const height: number = 60 + Math.trunc(comment.length / (listWidth / 18.8095238095)) * 10
	return height
}
