<template>
<div class="container">
<h2 >Board</h2> <p style="float: right">총 {{ forms.length }}개의 게시글이 있습니다.</p>
  <button class="btn btn-outline-info" @click="moveToCreate">
    글 작성하기
  </button>
</div>
<hr>

<div v-for="(form, i) in forms" :key="form.id" class="card mt-2 ml-5">
  <div class="card-body p-2 d-flex align-items-center" style="cursor: pointer" @click="moveToPage(form.id)">
    {{ forms.length - i }}번째 &nbsp; / {{ form.title }} / {{ form.id}}
  </div>
  <button class="ml-5" style="width: 100px" @click="del">delete</button>
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
    const sn = await db.collection('forms').get()
    sn.forEach(v => {
      const { title, content } = v.data()
      this.forms.push({
        title, content, id: v.id
      })
      console.log(v.id)
    })
  },
  // 삭제 구현
  del (form) {
    db.collection('forms').doc(form.id).delete()
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

</style>
