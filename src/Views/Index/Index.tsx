// REACT
import React, { lazy, Suspense } from 'react'

// COMPONENTES
import Navbar from 'Components/Layout/Navbar/Navbar'
import Toolbar from 'Components/Layout/Toolbar/Toolbar'
import Skeleton from 'Components/Skeleton/Skeleton'

// COMPONENTES
const CoursesList = lazy(() => import('Components/CoursesList/CoursesList'))

const IndexView = () => {
	return (
		<main>
			<Toolbar />
			<Navbar />
			<Suspense fallback={<Skeleton />}>
				<CoursesList />
			</Suspense>
		</main>
	)
}

export default IndexView
