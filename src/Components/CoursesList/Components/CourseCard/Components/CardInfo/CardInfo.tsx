// REACT
import React from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Style from './FileInfo.module.scss'

interface FileInfo {
	upload: string
	course: string
	type: string
}
const FileInfo: React.FC<FileInfo> = ({ upload, course, type }: FileInfo) => {
	// STRINGS
	const lang = useStrings()

	return (
		<div className={Style.fileMiddle}>
			<ul>
				<li>
					<i>{lang.course.labels[0]}:</i>
					<span>{upload}</span>
				</li>
				<li>
					<i>{lang.course.labels[1]}:</i>
					<span>{course}</span>
				</li>
				<li>
					<i>{lang.course.labels[2]}:</i>
					<span>{type}</span>
				</li>
			</ul>
		</div>
	)
}

export default FileInfo
