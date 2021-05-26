<template>
<div class="container">
<h2 >Board</h2> <p style="float: right">총 {{ forms.length }}개의 게시글이 있습니다.</p>
  <button class="btn btn-outline-info" @click="moveToCreate">
    글 작성하기
  </button>
</div>
<hr>
<form class="form">
  <div v-for="(form, i) in forms" :key="form.id" class="card mt-3 ml-5 mr-5">
    <div class="p-2" style="cursor: pointer" @click="moveToPage(form.id)">
      {{ form.title }} <em v-if="form.createdAt !== form.updatedAt" class="badge bg-success" style="font-size: 17px">수정됨</em>
      <p class="writer mr-3">작성자 : {{ form.name }}</p>
      <p class="index mr-3" style="font-size: 17px">No.{{ forms.length - i }}</p>
      <p v-if="form.createdAt !== form.updatedAt" class="date mr-3" style="text-decoration:underline">수정일 : {{ form.updatedAt }}</p>
      <p class="date mr-3">작성일 : {{ form.createdAt }}</p>
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
    const forms = ref([])
    onMounted(async () => {
      const sn = await db.collection('forms').orderBy('createdAt', 'desc').get()
      sn.forEach(doc => {
        const { title, content, createdAt, updatedAt, name } = doc.data()
        forms.value.push({
          title, content, id: doc.id, createdAt, updatedAt, name
        })
      })
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
        name: 'Create'
      })
    }
    return {
      moveToPage,
      moveToCreate,
      forms
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
