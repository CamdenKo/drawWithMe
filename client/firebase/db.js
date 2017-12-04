import firebase from 'firebase'
import initializeFirebase from './initialize'

initializeFirebase()
export default firebase.database()
