<template>
  <div class="container">
  <h2 class="mt-3">Board</h2>
    <p v-if="loading"></p>
    <p v-else style="float: right">총 {{ forms.length }}개의 게시글이 있습니다.</p>
    <button class="btn btn-outline-info" @click="moveToCreate">
      글 작성하기
    </button>
  </div>
  <hr>
  <form class="form">
    <div v-if="loading" class="form mt-5">
      <div class="spinner-border text-primary" role="status"></div> Loading
    </div>
    <div v-else v-for="(form, i) in forms" :key="form.id" class="card mt-3 ml-5 mr-5">
      <div class="ml-2" style="cursor: pointer" @click="moveToPage(form.id)">
        {{ form.title }}
        <em v-if="form.createdAt !== form.updatedAt" class="badge bg-warning" style="font-size: 17px">수정됨</em>
        <span class="writer mt-2 mr-3" style="float: right">
          <span class="badge rounded-pill bg-primary" style="font-size: 20px; color: white">{{ form.name }}</span>
        </span>
        <div>
          <p class="index ml-1 mt-4" style="color: deepskyblue; font-size: 17px; float: left">No.{{ forms.length - i }}</p>
          <p class="mr-3 mt-1" style="font-size: 15px; text-align: right">조회수 {{ form.views }}</p>
        </div>
        <div>
          <span v-if="form.createdAt !== form.updatedAt" class="date mr-3" style="text-decoration:underline; float: right">수정일 : {{ form.updatedAt }}</span>
          <span class="date mr-3" style="float: right">작성일 : {{ form.createdAt }}</span>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { db } from '@/fdb'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
  setup () {
    const loading = ref(true)
    const forms = ref([])

    onMounted(async () => {
      const sn = await db.collection('forms').orderBy('createdAt', 'desc').get()
      sn.forEach(doc => {
        const { title, content, createdAt, updatedAt, name, views } = doc.data()
        forms.value.push({
          title, content, id: doc.id, createdAt, updatedAt, name, views
        })
      })
      loading.value = false
    })

    const router = useRouter()
    const moveToPage = (Boardid) => {
      router.push({
        name: 'Boardid',
        params: {
          id: Boardid
        }
      })
    }
    const moveToCreate = () => {
      router.push({
        name: 'BoardCreate'
      })
    }
    return {
      moveToPage,
      moveToCreate,
      forms,
      loading
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
  font-size: 14px;
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
