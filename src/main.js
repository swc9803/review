import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

createApp(App).use(store).use(router).mount('#app')

const firebaseConfig = {
  apiKey: 'AIzaSyCd7mEYgQlLjU5lruFqRyqi2zV6ek2C-sQ',
  authDomain: 'recruit-62805.firebaseapp.com',
  databaseURL: 'https://recruit-62805-default-rtdb.firebaseio.com',
  projectId: 'recruit-62805',
  storageBucket: 'recruit-62805.appspot.com',
  messagingSenderId: '85948287390',
  appId: '1:85948287390:web:69750497b0d50f9d34ae8f',
  measurementId: 'G-6GYM404949'
}
firebase.initializeApp(firebaseConfig)
