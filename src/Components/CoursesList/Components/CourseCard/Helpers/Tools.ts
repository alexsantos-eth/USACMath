// TYPES
import { Es, Success } from 'Env/Strings'

// COPIAR TEXTO
const copyString = (str: string, waitAlert: Success, successAlert: Success) => {
	if ('clipboard' in navigator) {
		window.Alert({ ...waitAlert, type: 'window' })
		navigator.clipboard.writeText(str).then(
			window.Alert({
				...successAlert,
				type: 'confirm',
			})
		)
	}
}

// SHARE API
const shareAPI = (data: ShareData, waitAlert: Success) => {
	if ('share' in navigator) {
		window.Alert({ ...waitAlert, type: 'window' })
		navigator.share(data).then(window.hideAlert())
	}
}

// COMPARTIR DOCUMENTO
const shareFile = (url: string, lang: Es): void => {
	if ('share' in navigator)
		shareAPI({ title: lang.application.general.title, text: lang.share.text, url }, lang.share.wait)
	else copyString(url, lang.share.wait, lang.share.success)
}

export default shareFile
