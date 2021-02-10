import { saveComment } from 'Utils/Comments'

// CREAR COMENTARIO
const sendComment = async (
	id: number,
	comment: string,
	user: User | null
): Promise<FileComment | null> => {
	if (user && comment.length > 0) {
		// CREAR COMENTARIO
		const fileComment: FileComment = {
			comment,
			file: id,
			author: {
				name: user.name,
				picture: user.picture,
				email: user.email,
				uid: user.uid,
			},
			upload: new Date(),
		}

		// GUARDAR
		await saveComment(id, fileComment)
		return fileComment
	}
	return null
}

// ACTUALIZAR COMENTARIO
const addComment = async (
	id: number,
	comment: string,
	user: User | null,
	setCommentsList: React.Dispatch<React.SetStateAction<FileComments | null | undefined>>
): Promise<void> => {
	return sendComment(id, comment, user).then((fileComment: FileComment | null) =>
		setCommentsList((prevList: FileComments | null | undefined) => {
			if (fileComment) {
				// AGREGAR COMENTARIO A ESTADO
				const comments = prevList ? [...prevList.comments] : []
				comments.unshift(fileComment)

				// ACTUALIZAR
				return { id: prevList?.id || id, fileComment, comments }
			}
			return null
		})
	)
}

// ENVIAR COMENTARIO DE FORMULARIO
const submitComment = (
	setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
	setComment: React.Dispatch<React.SetStateAction<string>>,
	id: number,
	comment: string,
	user: User | null,
	setCommentsList: React.Dispatch<React.SetStateAction<FileComments | null | undefined>>
) => (ev: React.ChangeEvent | React.FormEvent): void => {
	ev.preventDefault()
	setSubmitting(true)
	addComment(id, comment, user, setCommentsList)
		.then(() => setComment(''))
		.then(() => setSubmitting(false))
}

export default submitComment
