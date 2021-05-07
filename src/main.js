import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

createApp(App).use(store).use(router).mount('#app')

const firebaseConfig = {
  apiKey: 'AIzaSyB3Q-Xqtq28-m885ZtYVQLqaOd-Vs-pnu4',
  authDomain: 'recruit-9d0ee.firebaseapp.com',
  databaseURL: 'https://recruit-9d0ee-default-rtdb.firebaseio.com',
  projectId: 'recruit-9d0ee',
  storageBucket: 'recruit-9d0ee.appspot.com',
  messagingSenderId: '390734189351',
  appId: '1:390734189351:web:a3e7d6c0f3066df09b4f02',
  measurementId: 'G-NR7V424FQ1'
}
firebase.initializeApp(firebaseConfig)
