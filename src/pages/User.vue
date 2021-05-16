<template>
<p>{{user.email}}</p>
<button type="submit" class="btn btn-dark btn-sm btn-block" @click="logOut()">
Log out
</button>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      user: null
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
  methods: {
    logOut () {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          alert('로그아웃 되었습니다.')
          this.$router.push({ name: 'Home' })
        })
      })
    }
  }
}
</script>
