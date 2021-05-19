<template>
<div class="container">
<h2 >Board</h2> <p style="float: right">총 {{ forms.length }}개의 게시글이 있습니다.</p>
  <button class="btn btn-outline-info" @click="moveToCreate">
    글 작성하기
  </button>
</div>
<hr>

<form class="form">
<div v-for="(form, i) in forms" :key="form.id" class="card mt-2 ml-5 mr-5">
  <div class="p-2" style="cursor: pointer" @click="moveToPage(form.id)">
    {{ form.title }}
  </div>
    <p class="writer mr-3">작성자 : {{ user.displayName }}</p>
    <p class="index mr-3">{{ forms.length - i }}번 글 </p>
    <p class="date mr-3">작성일 : {{ form.createdAt.toDate().toGMTString() }}</p>
</div>
</form>

</template>
<script>
import { db } from '@/fdb'
import 'firebase/firebase-firestore'
import firebase from 'firebase'
import { useRouter } from 'vue-router'

export default {
  data () {
    return {
      forms: [],
      form: {
        title: '',
        content: ''
      },
      user: ''
    }
  },
  methods: {
    moveToCreate () {
      this.$router.push({
        name: 'Create'
      })
    }
  },
  async created () {
    const sn = await db.collection('forms').orderBy('createdAt', 'desc').get()
    sn.forEach(v => {
      const { title, content, createdAt } = v.data()
      this.forms.push({
        title, content, id: v.id, createdAt
      })
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = ''
      }
    })
  },
  setup () {
    const router = useRouter()
    const moveToPage = (Boardid) => {
      router.push({
        name: 'Boardid',
        params: {
          id: Boardid
        }
      })
    }
    return {
      moveToPage
    }
  }
}
</script>

<style scoped>
 table, th, td {
  margin: auto;
  font-size: 20px;
  border: 1px solid;
 }
 .date {
  font-size: 15px;
  text-align: right;
 }
 .index {
   font-size: 20px;
   text-align: right;
 }
 .form {
  width: 70%;
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
}
 .writer {
  font-size: 20px;
  text-align: right
 }
</style>
