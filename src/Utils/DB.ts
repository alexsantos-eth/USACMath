let globalDB: firebase.default.firestore.Firestore | null = null

// COLECCIÓN
export const getCollection = async (col: string) => {
	// FIREBASE
	const frb = await import('Keys/firebase')
	await import('firebase/firestore')

	// DATABASE
	const db = globalDB === null ? frb.default.firestore() : globalDB

	// COLECCIÓN
	return db.collection(col)
}
