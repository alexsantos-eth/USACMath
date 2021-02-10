/* eslint-disable no-nested-ternary */
// REACT
import React, { useState, lazy, Suspense } from 'react'

// USER
import { useUser } from 'Hooks/Context'

// COMPONENTES
import CommentBoxSkeleton from 'Components/Skeleton/CommentBox/CommentBox'
import CommentInput from './Components/CommentInput/CommentInput'

// ESTILOS
import Styles from './CommentBox.module.scss'

// TOOLS
import useComments from './Helpers/Hooks'
import submitComment from './Helpers/Comments'

// COMPONENTES LAZY
const CommentsList = lazy(() => import('./Components/CommentsList/CommentsList'))

// PROPIEDADES
interface CommentBoxProps {
	id: number
}

const CommentBox: React.FC<CommentBoxProps> = ({ id }: CommentBoxProps) => {
	// USER
	const user = useUser()

	// COMENTARIO DE INPUT
	const [comment, setComment] = useState<string>('')

	// LISTA DE COMENTARIOS
	const [commentsList, setCommentsList] = useState<FileComments | null | undefined>(undefined)

	// ESTADO DE CARGA
	const [isSubmitting, setSubmitting] = useState<boolean>(false)

	// GUARDAR TEXTO
	const handleTextComment = (ev: React.ChangeEvent<HTMLInputElement>) => setComment(ev.target.value)

	// GUARDAR COMENTARIO
	const submitFileComment = submitComment(
		setSubmitting,
		setComment,
		id,
		comment,
		user,
		setCommentsList
	)

	// HOOKS
	useComments(id, setCommentsList)

	return (
		<div className={Styles.container}>
			{commentsList ? (
				<Suspense fallback={<CommentBoxSkeleton />}>
					<CommentsList comments={commentsList.comments} />
				</Suspense>
			) : commentsList === undefined ? (
				<CommentBoxSkeleton />
			) : (
				<span>Sin comentarios</span>
			)}
			<CommentInput
				isSubmitting={isSubmitting}
				handleTextComment={handleTextComment}
				submitFileComment={submitFileComment}
				comment={comment}
			/>
		</div>
	)
}

export default CommentBox
