// REACT
import React from 'react'

// ESTILOS
import Style from './CommentItem.module.scss'

interface CommentItemProps {
	comment: FileComment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }: CommentItemProps) => {
	return (
		<div className={Style.container}>
			<img src={comment.author.picture || ''} alt='User Pic' />
			<div className={Style.content}>
				<span>{comment.author.email?.replace('.usac.edu.gt', '')}</span>
				<p>{comment.comment}</p>
			</div>
		</div>
	)
}

export default CommentItem
