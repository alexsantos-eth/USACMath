// REACT
import React from 'react'

// PAGINAS
import Index from 'Pages/Index/Index'

// ROUTER
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// RUTAS
import { ROUTES } from 'Env/Routes'

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={ROUTES.files} component={Index} />
			</Switch>
		</BrowserRouter>
	)
}

export default Router
