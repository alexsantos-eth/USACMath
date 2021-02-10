// REACT
import React, { useState } from 'react'
import useAnimatedWidth from '../Helpers/Hooks'

// ESTILO
import Style from './CommentBox.module.scss'

const CommentBox: React.FC = () => {
	// ESTADO
	const [widths, setWidths] = useState<number[]>([0, 0, 0])

	// HOOKS
	useAnimatedWidth(setWidths)

	return (
		<div className={Style.container}>
			<span style={{ width: `${widths[0]}%` }} />
			<span style={{ width: `${widths[1]}%` }} />
			<span style={{ width: `${widths[2]}%` }} />
		</div>
	)
}

export default CommentBox
