import React from 'react'
import { Es } from 'Env/Strings'

// COMPONENTES
import CommentBox from '../Components/CommentBox/CommentBox'

// ABRIR ALERTA DE COMENTARIOS
const showCommentAlert = (lang: Es, id: number): void => {
	// ALERTA
	window.Alert({
		title: lang.comments.title,
		body: '',
		type: 'confirm',
		customElements: <CommentBox id={id} />,
	})
}

export default showCommentAlert
