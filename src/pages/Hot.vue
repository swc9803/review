<template>
  <div class="container">
  <h2><i class="fas fa-fire mt-3" style="color: red"></i><b>인기 순</b>
    <span @click="MoveToSearch" class="search mt-4">
      <i class="fas fa-search ml-4"></i>검색
    </span>
  </h2>
    <p v-if="loading"></p>
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
        <img class="ml-2 mt-2" :src='review.url' style="width: 20%" />
        <span class="writer mt-2 mr-3" style="float: right">
          <span class="badge rounded-pill bg-primary" style="font-size: 20px; color: white">{{ review.name }}</span>
        </span>
        <div>
          <p class="index ml-1 mt-4" style="color: deepskyblue; font-size: 17px; float: left">No.{{ i + 1 }}</p>
          <div style="font-size: 15px">
            <i class="fas fa-heart mr-3 ml-2 mt-1" style="color: red; float: right">
              <span style="color: black">{{ review.likeCount }}</span>
            </i>
            <p class="mr-3 mt-2" style="text-align: right">조회수 {{ review.views }}</p>
          </div>
        </div>
        <div>
          <span v-if="review.createdAt !== review.updatedAt" class="date mr-3" style="text-decoration:underline; float: right">수정일 : {{ review.updatedAt }}</span>
          <span class="date mr-3" style="float: right">작성일 : {{ review.createdAt }}</span>
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
    const reviews = ref([])

    onMounted(async () => {
      const sn = await db.collection('reviews').orderBy('likeCount', 'desc').get()
      sn.forEach(doc => {
        const { title, content, createdAt, updatedAt, name, views, likeCount, url } = doc.data()
        reviews.value.push({
          title, content, id: doc.id, createdAt, updatedAt, name, views, likeCount, url
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
    const MoveToSearch = () => {
      router.push({
        name: 'ReviewSearch'
      })
    }

    return {
      moveToPage,
      MoveToSearch,
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
 .search {
  cursor: pointer;
  position: absolute;
  right: 23%;
  font-size: 24px;
 }
</style>
