/**
 * Objeto de comentario
 * @property { comment } Texto sin limite de caracteres
 * @property { file } ID del curso
 * @property { author } Hereda de User
 * @property { upload } Fecha de ultima creación o modificación
 */
interface FileComment {
	comment: string
	file: number
	author: Partial<User>
	upload: Date
}

/**
 * Documento de comentarios, contiene la lista de comentarios por curso
 * @property { id } ID del curso
 * @property { comments } Lista de comentarios
 */
interface FileComments {
	id: number
	comments: FileComment[]
}
