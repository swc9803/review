<template>
  <div class="container">
  <h2>Review</h2>
    <p v-if="loading"></p>
    <p v-else style="float: right">총 {{ reviews.length }}개의 리뷰가 있습니다.</p>
    <button class="btn btn-outline-info" @click="moveToCreate">
      글 작성하기
    </button>
  </div>
  <hr>
  <form class="form">
    <div v-if="loading" class="form mt-5">
      <div class="spinner-border text-primary" role="status"></div> Loading
    </div>
    <div v-else v-for="(review, i) in reviews" :key="review.id" class="card mt-3 ml-5 mr-5">
      <div class="ml-2" style="cursor: pointer" @click="moveToPage(review.id)">
        {{ review.title }}
        <em v-if="review.createdAt !== review.updatedAt" class="badge bg-warning" style="font-size: 17px">수정됨</em>
        <na class="writer mt-2 mr-3" style="float: right">
          <span class="badge rounded-pill bg-primary" style="font-size: 20px; color: white">{{ review.name }}</span>
        </na>
        <div>
          <p class="index ml-1 mt-4" style="color: deepskyblue; font-size: 17px; float: left">No.{{ reviews.length - i }}</p>
          <p class="mr-3 mt-1" style="font-size: 15px; text-align: right">조회수 {{ review.views }}</p>
        </div>
        <date>
          <up v-if="review.createdAt !== review.updatedAt" class="date mr-3" style="text-decoration:underline; float: right">수정일 : {{ review.updatedAt }}</up>
          <cr class="date mr-3" style="float: right">작성일 : {{ review.createdAt }}</cr>
        </date>
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
    const reviews = ref([])

    onMounted(async () => {
      const sn = await db.collection('reviews').orderBy('createdAt', 'desc').get()
      sn.forEach(doc => {
        const { title, content, createdAt, updatedAt, name, views } = doc.data()
        reviews.value.push({
          title, content, id: doc.id, createdAt, updatedAt, name, views
        })
      })
      loading.value = false
    })

    const router = useRouter()
    const moveToPage = (Reviewid) => {
      router.push({
        name: 'Reviewid',
        params: {
          id: Reviewid
        }
      })
    }
    const moveToCreate = () => {
      router.push({
        name: 'ReviewCreate'
      })
    }
    return {
      moveToPage,
      moveToCreate,
      reviews,
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
