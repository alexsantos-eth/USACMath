// REACT
import React from 'react'

// TOOLS
import { VariableSizeList as List, ListChildComponentProps } from 'react-window'

// ESTILOS
import Style from './CommentsList.module.scss'
import CommentItem from './Components/CommentItem/CommentItem'
import listWidth, { getItemSize } from './Helpers/ListProps'

// PROPIEDADES
interface CommentsListProps {
	comments: FileComment[]
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }: CommentsListProps) => {
	return (
		<List
			itemSize={getItemSize(comments)}
			className={Style.container}
			width={listWidth}
			height={210}
			itemCount={comments.length}>
			{({ style, index }: ListChildComponentProps) => {
				return (
					<div className={Style.itemContainer} style={style}>
						<CommentItem comment={comments[index]} />
					</div>
				)
			}}
		</List>
	)
}

export default CommentsList
