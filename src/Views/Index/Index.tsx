// REACT
import React, { lazy, Suspense, useState } from 'react'

// COMPONENTES
import Navbar from 'Components/Layout/Navbar/Navbar'
import Toolbar from 'Components/Layout/Toolbar/Toolbar'
import Skeleton from 'Components/Skeleton/Skeleton'

// COMPONENTES
const CoursesList = lazy(() => import('Components/CoursesList/CoursesList'))

const IndexView = () => {
	// SEARCH
	const [search, setSearch] = useState<string>('')

	// CAMBIAR ESTADO
	const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => setSearch(ev.target.value)

	return (
		<main>
			<Toolbar />
			<Navbar onSearch={handleSearch} />
			<Suspense fallback={<Skeleton />}>
				<CoursesList search={search} />
			</Suspense>
		</main>
	)
}

export default IndexView
