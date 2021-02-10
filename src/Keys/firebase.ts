import firebase from 'firebase/app'
import 'firebase/analytics'
import Key from './key.json'

if (!firebase.apps.length) {
	firebase.initializeApp(Key)
	firebase.analytics()
}
export default firebase
