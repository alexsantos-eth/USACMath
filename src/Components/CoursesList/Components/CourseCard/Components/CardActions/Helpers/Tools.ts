// TYPES
import { Es, Error } from 'Env/Strings'

/**
 * Copiar string usando ClipboardAPI
 * @param  {string} str
 * @param  {Error} waitAlert
 * @param  {Error} successAlert
 */
const copyString = (str: string, waitAlert: Error, successAlert: Error) => {
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

/**
 * Usar ShareAPI con texto
 * @param  {ShareData} data
 * @param  {Error} waitAlert
 */
const shareAPI = (data: ShareData, waitAlert: Error) => {
	if ('share' in navigator) {
		window.Alert({ ...waitAlert, type: 'window' })
		navigator.share(data).then(window.hideAlert())
	}
}

/**
 * Cambiar entre ClipboardAPI y ShareAPI cuando estén disponibles
 * @param  {string} url
 * @param  {Es} lang
 */
const shareFile = (url: string, lang: Es): void => {
	if ('share' in navigator)
		shareAPI({ title: lang.application.general.title, text: lang.share.text, url }, lang.share.wait)
	else copyString(url, lang.share.wait, lang.share.success)
}

export default shareFile
