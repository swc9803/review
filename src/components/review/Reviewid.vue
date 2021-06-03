<template>
  <div v-if="loading" class="form mt-5">
    <div class="spinner-border text-primary" role="status"></div> Loading
  </div>
  <div v-else>
    <form class="form">
      <div class="title card mt-4">
        <div class="ml-2">
          {{ title }}
          <em v-if="createdAt !== updatedAt" class="badge bg-warning ml-1" style="font-size: 17px">
            수정됨
          </em>
        </div>
      </div>
        <div class="card">
          <div class="ml-2 mb-1">
            <span class="badge rounded-pill bg-primary" style="font-size: 20px; color: white">
              {{ name }}
              </span>
              <span class="date mr-3 mt-2">
                <span>
                  조회수 {{ views }}
                </span>
                <span class="ml-1">
                  작성일 : {{ createdAt }}
                </span>
                <span v-if="createdAt !== updatedAt" class="ml-1" style="text-decoration:underline">
                  수정일 : {{ updatedAt }}
                </span>
              </span>
          </div>
        </div>
      <div class="card mt-4" style="min-height: 100px">
        <p class="ml-2" style="white-space: pre-line">
          {{ content }}
          {{ url }}
        </p>
      </div>
      <div class="mt-2" style="text-align: center">
        <span @click.prevent="Like" class="like p-1">
          <p>좋아요 <i class="fas fa-heart" style="color: red"></i></p>{{ likeCount }}</span>
        <span @click.prevent="DisLike" class="like p-1">
          <p>싫어요 <i class="fas fa-heart-broken" style="color: skyblue"></i></p>{{ dislikeCount }}</span>
      </div>
      <div v-if="user.uid === uid" class="btn m-2">
        <router-link :to="{ name: 'ReviewEdit'}"><button class="btn btn-secondary mr-0">수정</button></router-link>
        <button @click.prevent="openModal" class="btn btn-danger mr-3">삭제</button>
      </div>
    </form>
    <div class="btn">
      <ReviewDeleteModal
        v-if="showModal"
        @close="closeModal"
        @delete="Deletereview"
      />
    </div>
    <br class="form">
    <div>
      <ReviewComment />
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { db, auth } from '@/fdb'
import ReviewDeleteModal from '@/components/review/ReviewDeleteModal'
import { ref, onMounted } from 'vue'
import ReviewComment from '@/components/review/ReviewComment'

export default {
  data () {
    return {
      user: ''
    }
  },
  setup () {
    const loading = ref(true)
    const route = useRoute()
    const router = useRouter()
    const showModal = ref(false)
    const uid = ref('')
    const name = ref('')
    const title = ref('')
    const content = ref('')
    const createdAt = ref('')
    const updatedAt = ref('')
    const views = ref('')
    const likeCount = ref('')
    const dislikeCount = ref('')
    const url = ref('')

    onMounted(async () => {
      const reviewinfo = db.collection('reviews').doc(route.params.id)
      const doc = await reviewinfo.get()
      uid.value = doc.data().uid
      name.value = doc.data().name
      title.value = doc.data().title
      content.value = doc.data().content
      createdAt.value = doc.data().createdAt
      updatedAt.value = doc.data().updatedAt
      views.value = doc.data().views
      likeCount.value = doc.data().likeCount
      dislikeCount.value = doc.data().dislikeCount
      url.value = doc.data().url
      await db.collection('reviews').doc(route.params.id).update(
        {
          views: (views.value + 1)
        }
      )
      loading.value = false
    })

    const openModal = () => {
      showModal.value = true
    }
    const closeModal = () => {
      showModal.value = false
    }
    const Deletereview = async () => {
      await db.collection('reviews').doc(route.params.id).delete().then(() => {
        alert('정상적으로 삭제되었습니다.')
        showModal.value = false
        router.push({
          name: 'Review'
        })
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    }
    const Updatereview = () => {
      router.push({
        name: 'ReviewEdit'
      })
    }
    const Like = async () => {
      await db.collection('reviews').doc(route.params.id).update(
        {
          likeCount: (likeCount.value + 1)
        }
      )
    }
    const DisLike = async () => {
      await db.collection('reviews').doc(route.params.id).update(
        {
          dislikeCount: (dislikeCount.value + 1)
        }
      )
    }

    return {
      loading,
      showModal,
      openModal,
      closeModal,
      Deletereview,
      Updatereview,
      uid,
      name,
      title,
      content,
      createdAt,
      updatedAt,
      views,
      Like,
      DisLike,
      likeCount,
      dislikeCount,
      url
    }
  },
  components: {
    ReviewDeleteModal,
    ReviewComment
  },
  mounted () {
    auth.onAuthStateChanged((user) => {
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
    font-size: 14px;
    float: right;
  }
  .title {
    background: rgb(222, 222, 222)
  }
  .form {
    width: 70%;
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
  }
  .btn {
    float: right;
    margin-right: 10%;
  }
  .like{
    cursor: pointer;
    font-size: 12px;
    border: 1px rgb(222, 222, 222) solid;
    display: inline-block;
    margin: 1%;
  }
</style>
