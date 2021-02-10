// REACT
import React from 'react'

// ESTILOS
import Style from './Preview.module.scss'

// PROPIEDADES
interface PreviewProps {
	url: string
}

const Preview: React.FC<PreviewProps> = ({ url }: PreviewProps) => {
	return (
		<div className={Style.container}>
			<label htmlFor='openPreview' className='material-icons'>
				close
			</label>
			<iframe src={`${url}&embedded=true`} title='PDF Doc' />
		</div>
	)
}

export default Preview
