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
	zIndex: 10,
})
