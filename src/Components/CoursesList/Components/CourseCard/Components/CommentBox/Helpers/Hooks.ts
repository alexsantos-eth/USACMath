// REACT
import { useEffect } from 'react'

// TOOLS
import readComments from 'Utils/Comments'

// USAR COMENTARIOS
const useComments = (
	id: number,
	setComments: React.Dispatch<React.SetStateAction<FileComments | null | undefined>>
): void => {
	useEffect(() => {
		readComments(id).then(setComments)
	}, [id, setComments])
}

export default useComments
