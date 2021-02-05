// REACT
import React, { lazy, Suspense, useState, FC } from 'react'

// COMPONENTES
import Navbar from 'Components/Layout/Navbar/Navbar'
import Toolbar from 'Components/Layout/Toolbar/Toolbar'
import Skeleton from 'Components/Skeleton/Skeleton'

// COMPONENTES
const CoursesList = lazy(() => import('Components/CoursesList/CoursesList'))

const IndexView: FC = () => {
	// SEARCH
	const [search, setSearch] = useState<string>('')

	// CAMBIAR ESTADO
	const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => setSearch(ev.target.value)
	const handleQuickSearch = (quickSearch: string) => setSearch(quickSearch)

	return (
		<>
			<Toolbar />
			<Navbar onSearch={handleSearch} onQuickSearch={handleQuickSearch} />
			<Suspense fallback={<Skeleton />}>
				<CoursesList search={search} />
			</Suspense>
		</>
	)
}

export default IndexView
