<template>
<div class="container">
<h2 >Board</h2> <p style="float: right">총 {{ forms.length }}개의 게시글이 있습니다.</p>
  <button class="btn btn-outline-info" @click="moveToCreate">
    글 작성하기
  </button>
</div>
<hr>

<div v-for="(form, i) in forms" :key="form.id" class="card mt-2 ml-5 mr-5">
  <div class="card-body p-2" style="cursor: pointer" @click="moveToPage(form.id)">
    {{ form.title }} &nbsp;&nbsp; /&nbsp; {{ form.id}}
  </div>
    <p class="index mr-3">{{ forms.length - i }}번 글 </p>
    <p class="date mr-3">작성일 : {{ form.createdAt.toDate().toGMTString() }}</p>
</div>

</template>
<script>
import { db } from '@/fdb'
import 'firebase/firebase-firestore'
import { useRouter } from 'vue-router'

export default {
  data () {
    return {
      forms: [],
      form: {
        title: '',
        content: ''
      }
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
</style>
