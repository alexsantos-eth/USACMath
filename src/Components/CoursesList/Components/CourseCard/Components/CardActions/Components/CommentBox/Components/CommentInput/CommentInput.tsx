// REACT
import React from 'react'

// HOOKS
import { useStrings, useUser } from 'Hooks/Context'

// ESTILOS
import Styles from './CommentInput.module.scss'

// PROPS
interface CommentInputProps {
	submitFileComment: (ev: React.ChangeEvent<Element> | React.FormEvent<Element>) => void
	handleTextComment: (ev: React.ChangeEvent<HTMLInputElement>) => void
	isSubmitting: boolean
	comment: string
}

const CommentInput: React.FC<CommentInputProps> = ({
	isSubmitting,
	comment,
	submitFileComment,
	handleTextComment,
}: CommentInputProps) => {
	// STRINGS
	const lang = useStrings()

	// USER
	const user = useUser()

	return (
		<form
			className={`${Styles.newComment} ${isSubmitting ? Styles.disableForm : Styles.enableForm}`}
			onSubmit={submitFileComment}>
			<img src={user?.picture || ''} alt='User pic' />
			<input
				value={comment}
				type='text'
				id='comment'
				placeholder={lang.comments.placeholder}
				onChange={handleTextComment}
			/>
			<button type='submit' className='material-icons' onClick={submitFileComment}>
				arrow_forward
			</button>
		</form>
	)
}

export default CommentInput
