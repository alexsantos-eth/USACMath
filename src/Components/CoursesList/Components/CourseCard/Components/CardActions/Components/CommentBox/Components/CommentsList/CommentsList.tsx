// REACT
import React, { useRef } from 'react'

// TOOLS
import { VariableSizeList as List, ListChildComponentProps } from 'react-window'

// ESTILOS
import Style from './CommentsList.module.scss'

// COMPONENTES
import CommentItem from './Components/CommentItem/CommentItem'

// HOOKS Y PROPS
import useAutoScroll from './Helpers/Hooks'
import listWidth from './Helpers/ListProps'

// PROPIEDADES
interface CommentsListProps {
	comments: FileComment[]
	isSubmitting: boolean
}

const CommentsList: React.FC<CommentsListProps> = ({
	comments,
	isSubmitting,
}: CommentsListProps) => {
	// REFERENCIAS
	const sizeMap: React.MutableRefObject<number[]> = useRef([])

	// REFERENCIA DE LISTA
	const listRef: React.RefObject<List> = useRef(null)

	// ASIGNAR ALTO
	const setSize = (index: number, size: number) => {
		listRef.current?.resetAfterIndex(0)
		sizeMap.current[index] = size
	}

	// OBTENER ALTO
	const getSize = (index: number) => sizeMap.current[index] || 60

	// ACTUALIZAR LISTA
	useAutoScroll(isSubmitting, listRef)

	return (
		<List
			ref={listRef}
			itemSize={getSize}
			className={Style.container}
			width={listWidth}
			height={210}
			itemCount={comments.length}>
			{({ style, index }: ListChildComponentProps) => {
				return (
					<div className={Style.itemContainer} style={style}>
						<CommentItem comment={comments[index]} index={index} setSize={setSize} />
					</div>
				)
			}}
		</List>
	)
}

export default CommentsList
