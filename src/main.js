import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

createApp(App).use(store).use(router).mount('#app')

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

firebase.initializeApp(firebaseConfig)
