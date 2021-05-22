<template>
<form class="form">
  <div class="title card mt-4">
    <div class="ml-2">{{ form.title }} <em v-if="form.createdAt !== form.updatedAt" class="badge bg-success" style="font-size: 17px">수정됨</em>
      <span class="badge badge-light mr-4 mt-2" style="float: right">작성자 : {{ form.name }}</span>
      <p class="date mr-3">작성일 : {{ form.createdAt }}</p>
      <p v-if="form.createdAt !== form.updatedAt" class="date mr-3">수정일 : {{ form.updatedAt }}</p>
    </div>
  </div>
  <div class="card mt-4" style="height: 400px">
    <div class="ml-2">
      {{ form.content }}
    </div>
  </div>
</form>
</template>
<script>
import { useRoute } from 'vue-router'
import 'firebase/firebase-firestore'
import firebase from 'firebase'
import { db } from '@/fdb'

export default {
  data () {
    return {
      forms: [],
      form: {
        title: '',
        content: '',
        createdAt: '',
        updatedAt: ''
      },
      user: ''
    }
  },
  async created () {
    const route = useRoute()
    const forminfo = db.collection('forms').doc(route.params.id)
    const doc = await forminfo.get()
    this.form.name = doc.data().name
    this.form.title = doc.data().title
    this.form.content = doc.data().content
    this.form.createdAt = doc.data().createdAt
    this.form.updatedAt = doc.data().updatedAt
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = ''
      }
    })
  }
}
</script>

<style scoped>
  .date {
    text-align: right;
    font-size: 15px;
  }
  .title {
    background: lightgray;
  }
  .form {
    width: 70%;
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
  }
</style>
