// REACT
import React, { FC } from 'react'

// PAGINAS
import Index from 'Pages/Index/Index'

// ROUTER
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// RUTAS
import ROUTES from 'Env/Routes'

// ALERTS
import withAlerts from '@weareluastudio/lualert'

const Router: FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={ROUTES.files} component={Index} />
			</Switch>
		</BrowserRouter>
	)
}

export default withAlerts(Router, {
	blurred: true,
	confirmText: 'Aceptar',
	cancelText: 'Cancelar',
	confirmColor: '#1976d2',
	zIndex: 10,
})
