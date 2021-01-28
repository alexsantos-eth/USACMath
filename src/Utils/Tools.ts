import { colors } from 'Env/Globals'

// CAMBIAR UN COLOR
const changeColor = (selectedColor: IColor, dark: boolean) => {
	// SELECCIONAR BODY
	const body: HTMLElement = document.body

	// CAMBIAR PROPIEDAD
	body.style.setProperty(selectedColor.name, dark ? selectedColor.darkValue : selectedColor.value)
}

// CAMBIAR TODOS
export const toggleDarkMode = () => {
	// LEER VARIABLE GLOBAL
	const darkValue: boolean = window.localStorage.getItem('darkMode') === '1'

	// RECORRER CAMBIOS
	colors.forEach((color: IColor) => changeColor(color, darkValue))
}

// ALERTA DE ACTUALIZACIONES
export const updateApp = () => {
	import('react').then(({ createElement }) => {
		import('Assets/general/update.svg').then((UpdateSVG) => {
			// IMAGEN
			const image = createElement('img', {
				alt: 'Update',
				src: UpdateSVG.default,
				style: {
					width: '100%',
					marginTop: '20px',
				},
			})

			// ACTUALIZAR APP
			try {
				window.navigator.serviceWorker
					.getRegistration()
					.then((reg: ServiceWorkerRegistration | undefined) => {
						reg?.addEventListener('updatefound', () => {
							const worker = reg.installing
							worker?.addEventListener('statechange', () => {
								if (worker.state === 'installed') {
									window.Alert({
										type: 'confirm',
										fixed: true,
										body: 'Hay una nueva actualización disponible, ¿deseas actualizar?',
										title: 'Actualización',
										confirmText: 'Recargar',
										customElements: image,
										onConfirm: () => window.location.reload(),
									})
									worker.postMessage({ type: 'SKIP_WAITING' })
								}
							})
						})
					})
			} catch (error) {
				console.log(error)
			}
		})
	})
}
