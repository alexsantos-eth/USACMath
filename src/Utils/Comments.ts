import getCollection from './DB'

// LEER DOCUMENTO DE COMENTARIO
const getCommentDoc = async (
	id: number
): Promise<firebase.default.firestore.Query<firebase.default.firestore.DocumentData>> => {
	const col = await getCollection('comments')
	const doc = col.where('id', '==', id).limit(1)
	return doc
}

// LEER COMENTARIOS
const readComments = async (id: number): Promise<FileComments> => {
	const doc = await getCommentDoc(id)
	const snap = await doc.get()
	const data = snap.docs.map((sDoc) => sDoc.data()) as [FileComments]

	// RETORNAR
	return data[0]
}

// GUARDAR COMENTARIO
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
		comments.push(comment)

		// GUARDAR
		await col.doc(docId[0]).set({ comments }, { merge: true })
	}

	// CREAR NUEVO
	else await col.add({ id, comments: [comment] })
}

export default readComments
