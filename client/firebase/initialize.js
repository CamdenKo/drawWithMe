import firebase from 'firebase'

let initialized = false
export default () => {
  if (!initialized) {
    initialized = true
    firebase.initializeApp({
      apiKey: 'AIzaSyBUASOZkBW7RnthbjVNYV4VP3LNdP5GjkY',
      authDomain: 'drawmything-abf23.firebaseapp.com',
      databaseURL: 'https://drawmything-abf23.firebaseio.com',
      projectId: 'drawmything-abf23',
      storageBucket: 'drawmything-abf23.appspot.com',
      messagingSenderId: '31967567253',
    })
  }
}
