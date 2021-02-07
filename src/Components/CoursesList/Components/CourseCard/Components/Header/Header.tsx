// REACT
import React from 'react'

// ESTILOS
import Style from './Header.module.scss'

interface HeaderProps {
	title: string
	text: string
}

const Header: React.FC<HeaderProps> = ({ title, text }: HeaderProps) => {
	return (
		<div className={Style.fileHead}>
			<h1>{title}</h1>
			<p>{text}</p>
		</div>
	)
}

export default Header
