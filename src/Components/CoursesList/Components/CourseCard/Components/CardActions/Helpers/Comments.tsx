import React from 'react'
import { Es } from 'Env/Strings'

// COMPONENTES
import CommentBox from '../Components/CommentBox/CommentBox'

/**
 * Mostrar alerta de caja de comentarios
 * @param lang
 * @param id
 * @returns void
 */
const showCommentAlert = (lang: Es, id: number): void => {
	// ALERTA
	window.Alert({
		title: lang.comments.title,
		body: '',
		type: 'confirm',
		customElements: <CommentBox id={id} />,
		onHide: () => window.hideAlert(),
	})
}

export default showCommentAlert
