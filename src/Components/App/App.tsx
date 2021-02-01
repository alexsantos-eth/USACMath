// REACT
import React from 'react'

// ROUTER
import Router from 'Router/Router'

// ICONOS
import 'Icons/style.css'

// PROVIDERS
import StringsProvider from 'Providers/Strings'
import DarkmodeProvider from 'Providers/Darkmode'

// ALERTAS
import withAlerts from '@weareluastudio/lualert'

const App: React.FC = () => {
	return (
		<StringsProvider>
			<DarkmodeProvider>
				<Router />
			</DarkmodeProvider>
		</StringsProvider>
	)
}

export default withAlerts(App, {
	blurred: true,
	confirmText: 'Aceptar',
	cancelText: 'Cancelar',
	confirmColor: '#1976d2',
	zIndex: 10,
})
