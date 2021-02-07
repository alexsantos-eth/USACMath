import { saveComment } from 'Utils/Comments'

// CREAR COMENTARIO
const sendComment = async (id: number, comment: string, user: User | null): Promise<void> => {
	if (user && comment.length > 0) {
		// CREAR COMENTARIO
		const fileComment: FileComment = {
			comment,
			file: id,
			author: {
				name: user.name,
				picture: user.picture,
				uid: user.uid,
			},
			upload: new Date(),
		}

		// GUARDAR
		await saveComment(id, fileComment)
	}
}

export default sendComment
