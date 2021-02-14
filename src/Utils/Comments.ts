import getCollection from './DB'

/**
 * Obtener comentarios de curso en DB
 * @param  {number} id
 * @return Promise<firestore.Query<firestore.DocumentData>>
 */
const getCommentDoc = async (
	id: number
): Promise<firebase.default.firestore.Query<firebase.default.firestore.DocumentData>> => {
	const col = await getCollection('comments')
	const doc = col.where('id', '==', id).limit(1)
	return doc
}

/**
 * Obtener comentarios por curso en DB
 * @param  {number} id
 * @returns Promise<FileComments | null>
 */
const readComments = async (id: number): Promise<FileComments | null> => {
	const doc = await getCommentDoc(id)
	const snap = await doc.get()
	const data = snap.docs.map((sDoc) => sDoc.data()) as [FileComments]

	// RETORNAR
	return data[0] || null
}

/**
 * Guardar comentarios por curso en lista en DB
 * @param  {number} id
 * @param  {FileComment} comment
 * @returns Promise<void>
 */
export const saveComment = async (id: number, comment: FileComment): Promise<void> => {
	// LEER COMENTARIO
	const col = await getCollection('comments')
	const doc = col.where('id', '==', id).limit(1)
	const snap = await doc.get()
	const docId = snap.docs.map((sDoc) => sDoc.id) as [string]
	const data = snap.docs.map((sDoc) => sDoc.data()) as [FileComments]

	if (data[0]) {
		// AGREGAR
		const comments: FileComment[] = data[0].comments || []
		comments.unshift(comment)

		// GUARDAR
		await col.doc(docId[0]).set({ comments }, { merge: true })
	}

	// CREAR NUEVO
	else await col.add({ id, comments: [comment] })
}

export default readComments
