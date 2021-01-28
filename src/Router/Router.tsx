// REACT
import React from 'react'

// PAGINAS
import Index from 'Pages/Index/Index'

// ROUTER
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Index} />
			</Switch>
		</BrowserRouter>
	)
}

export default Router
