// REACT
import React from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Style from './CardActions.module.scss'

// TOOLS
import showCommentAlert from '../../Helpers/Comments'
import shareFile from '../../Helpers/Tools'

interface CardActionsProps {
	link: string
	title: string
	id: number
}

const CardActions: React.FC<CardActionsProps> = ({ link, title, id }: CardActionsProps) => {
	// STRINGS
	const lang = useStrings()

	// COMPARTIR DOCUMENTO
	const handleShareFile = (url: string) => () => shareFile(url, lang)

	// MOSTRAR COMENTARIOS
	const handelComments = (fileId: number) => () => showCommentAlert(lang, fileId)

	return (
		<div className={Style.fileBody}>
			<div className={Style.actions}>
				<button type='button' className={Style.action}>
					<i data-link={link} className='material-icons'>
						visibility
					</i>
				</button>
				<button type='button' onClick={handleShareFile(link)} className={Style.action}>
					<i data-link={link} className='material-icons'>
						share
					</i>
				</button>
				<button onClick={handelComments(id)} type='button' className={Style.action}>
					<i data-file={title} className='material-icons'>
						comment
					</i>
				</button>
			</div>

			<a href={link} title={title} download>
				<i className='material-icons'>arrow_downward</i> {lang.course.download}
			</a>
		</div>
	)
}

export default CardActions
