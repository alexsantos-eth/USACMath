// REACT
import React from 'react'

// ROUTER
import Router from 'Router/Router'

// PROVIDERS
import DarkmodeProvider from 'Providers/Darkmode'
import StringsProvider from 'Providers/Strings'
import AuthProvider from 'Providers/Auth'

const App: React.FC = () => {
	return (
		<StringsProvider>
			<DarkmodeProvider>
				<AuthProvider>
					<Router />
				</AuthProvider>
			</DarkmodeProvider>
		</StringsProvider>
	)
}

export default App
