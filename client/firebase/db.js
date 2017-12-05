import firebase from 'firebase'
import initializeFirebase from './initialize'

initializeFirebase()
export default firebase.database()

export const defaultRoom = {
  drawing: false,
  judge: '',
  players: false,
  started: false,
  word: '',
}
