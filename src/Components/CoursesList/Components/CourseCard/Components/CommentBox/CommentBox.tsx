// REACT
import React, { useEffect, useState } from 'react'

// USER
import { useStrings, useUser } from 'Hooks/Context'

// UTILS
import readComments from 'Utils/Comments'
import sendComment from './Helpers/Comments'

// ESTILOS
import Styles from './CommentBox.module.scss'

// PROPIEDADES
interface CommentBoxProps {
	id: number
}

const CommentBox: React.FC<CommentBoxProps> = ({ id }: CommentBoxProps) => {
	// STRINGS
	const lang = useStrings()

	// USER
	const user = useUser()

	// ESTADO
	const [comment, setComment] = useState<string>('')

	// GUARDAR TEXTO
	const handleTextComment = (ev: React.ChangeEvent<HTMLInputElement>) => setComment(ev.target.value)

	// GUARDAR COMENTARIO
	const handleFileComment = () => sendComment(id, comment, user)

	useEffect(() => {
		readComments(id).then((comments) => {
			// eslint-disable-next-line no-console
			console.log(comments)
		})
	}, [id])

	return (
		<div className={Styles.container}>
			<img src={user?.picture || ''} alt='User pic' />
			<input
				value={comment}
				type='text'
				id='comment'
				placeholder={lang.comments.placeholder}
				onChange={handleTextComment}
			/>
			<button type='button' className='material-icons' onClick={handleFileComment}>
				arrow_forward
			</button>
		</div>
	)
}

export default CommentBox
