// REACT
import { useEffect } from 'react'

// WINDOW
import { VariableSizeList } from 'react-window'

// ACTUALIZAR LISTA
const useAutoScroll = (isSubmitting: boolean, listRef: React.RefObject<VariableSizeList>): void =>
	useEffect(() => {
		if (!isSubmitting) listRef.current?.scrollTo(0)
	}, [isSubmitting])

export default useAutoScroll
