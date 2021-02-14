const globalDB: firebase.default.firestore.Firestore | null = null

/**
 * Obtener cualquier collection en la DB
 * @param  {string} col
 */
const getCollection = async (
	col: string
): Promise<
	firebase.default.firestore.CollectionReference<firebase.default.firestore.DocumentData>
> => {
	// FIREBASE
	const frb = await import('Keys/firebase')
	await import('firebase/firestore')

	// DATABASE
	const db = globalDB === null ? frb.default.firestore() : globalDB

	// COLECCIÓN
	return db.collection(col)
}

export default getCollection
