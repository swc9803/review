import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyA8qqqeszhsXlKi_kIZTKlCXnfLo_lBWaw',
  authDomain: 'rhdyd-a7e3b.firebaseapp.com',
  databaseURL: 'https://rhdyd-a7e3b-default-rtdb.firebaseio.com',
  projectId: 'rhdyd-a7e3b',
  storageBucket: 'rhdyd-a7e3b.appspot.com',
  messagingSenderId: '316902768690',
  appId: '1:316902768690:web:06bc8c4b62fe8150697c2b',
  measurementId: 'G-6TTHN5HP14'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {
  db,
  auth,
  storage
}
