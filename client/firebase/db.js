import firebase from 'firebase'
import initializeFirebase from './initialize'

initializeFirebase()
export default firebase.database()

export const defaultRoom = {
  drawing: [],
  judge: '',
  players: {},
  started: false,
  word: '',
}
