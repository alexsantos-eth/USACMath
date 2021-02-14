// REACT
import { useEffect } from 'react'

// TOOLS
import readComments from 'Utils/Comments'

/**
 * Hook para comentarios desde de DB
 * @param  {number} id
 * @param  {React.Dispatch<React.SetStateAction<FileComments|null|undefined>>} setComments
 */
const useComments = (
	id: number,
	setComments: React.Dispatch<React.SetStateAction<FileComments | null | undefined>>
): void => {
	useEffect(() => {
		readComments(id).then(setComments)
	}, [id, setComments])
}

export default useComments
