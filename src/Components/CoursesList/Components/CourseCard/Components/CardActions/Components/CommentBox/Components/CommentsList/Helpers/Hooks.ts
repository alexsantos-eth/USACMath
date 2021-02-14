// REACT
import { useEffect } from 'react'

// WINDOW
import { VariableSizeList } from 'react-window'

/**
 * Hacer scroll a la lista virtual cuando cambie
 * @param  {boolean} isSubmitting
 * @param  {React.RefObject<VariableSizeList>} listRef
 */
const useAutoScroll = (isSubmitting: boolean, listRef: React.RefObject<VariableSizeList>): void =>
	useEffect(() => {
		if (!isSubmitting) listRef.current?.scrollTo(0)
	}, [isSubmitting])

export default useAutoScroll
