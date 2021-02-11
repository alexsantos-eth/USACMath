// REACT
import React, { useEffect, useRef } from 'react'

// ESTILOS
import Style from './CommentItem.module.scss'

interface CommentItemProps {
	comment: FileComment
	index: number
	setSize: (index: number, size: number) => void
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, index, setSize }: CommentItemProps) => {
	// REFERENCIAS
	const itemRef: React.RefObject<HTMLDivElement> = useRef(null)

	// ENVIAR ALTO
	useEffect(() => {
		setSize(index, itemRef.current?.clientHeight || 60)
	}, [])

	return (
		<div ref={itemRef} className={Style.container}>
			<img src={comment.author.picture || ''} alt='User Pic' />
			<div className={Style.content}>
				<span>{comment.author.email?.replace('.usac.edu.gt', '')}</span>
				<p>{comment.comment}</p>
			</div>
		</div>
	)
}

export default CommentItem
