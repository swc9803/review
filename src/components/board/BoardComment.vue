<template>
  <div v-if="loading" class="form">
    <div class="spinner-border text-primary" role="status"></div> Loading
  </div>
  <form v-else class="form">
    <hr>
    <br>
    <p style="font-size: 15px">
      {{ comments.length }} 개의 댓글이 있습니다.
    </p>
    <form>
      <div>
        <div v-for="comment in comments" :key="comment.id" class="comment card mb-3">
            <span>
              <p class="badge badge-light ml-2 mt-2">
                {{ comment.name }}
              </p>
              <div class="mt-2" style="font-size: 15px; float: right">
                <div v-if="user.uid === comment.uid">
                  <span @click.prevent="deleteComment(comment.id)" class="mr-3 mt-2" style="float: right; color: red; cursor:pointer">
                    <i class="fas fa-trash"></i>
                  </span>
                </div>
              </div>
              <p class="mt-3 mr-2" style="font-size: 15px; float: right">
                {{ comment.createdAt }}
              </p>
            </span>
          <div class="card mb-2 ml-2 mr-2">
            <span class="ml-2">
              {{ comment.comment }}
            </span>
          </div>
        </div>
      </div>
    </form>
    <div v-if="user != ''" class="card comment">
      <div class="m-2">
        <span class="badge badge-pill badge-light" style="float: left">
          {{ user.displayName }}
        </span>
      </div>
      <form @submit.prevent="saveComment">
        <div>
          <textarea class="form-control col-11 ml-2" v-model="comment" placeholder="comment" required></textarea>
          <button type="submit" class="btn btn-primary m-2" style="float: right">작성</button>
        </div>
      </form>
    </div>
    <div v-else class="card mt-5" style="text-align: center; color: white; background-color: gray">
      댓글을 작성하시려면 로그인을 해주세요!
    </div>
  </form>
</template>

<script>
import { db, auth } from '@/fdb'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  data () {
    return {
      user: ''
    }
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const comments = ref([])
    const loading = ref(true)

    onMounted(async () => {
      const sn = await db.collection('forms').doc(route.params.id).collection('comments').orderBy('createdAt', 'asc').get()
      sn.forEach(doc => {
        const { comment, createdAt, name, uid } = doc.data()
        comments.value.push({
          comment, id: doc.id, createdAt, name, uid
        })
      })
      loading.value = false
    })

    const currentDate = new Date()
    const createdAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)
    const updatedAt = createdAt
    const comment = ref('')

    const saveComment = async () => {
      const uid = auth.currentUser.uid
      const name = auth.currentUser.displayName
      const formSnap = await db.collection('forms').doc(route.params.id).collection('comments').add(
        {
          comment: comment.value, createdAt, updatedAt, uid, name
        }
      )
      comment.value = ''
      router.go(router.currentRoute)
      return formSnap.id
    }

    const deleteComment = async (fID) => {
      await db.collection('forms').doc(route.params.id).collection('comments').doc(fID).delete()
      alert('정상적으로 삭제되었습니다.')
      router.go(router.currentRoute)
    }

    return {
      comments,
      comment,
      saveComment,
      deleteComment,
      loading
    }
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
  .form {
    width: 70%;
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
  }
  .badge {
    text-align: left
  }
  .comment {
    background: rgb(222, 222, 222)
  }
</style>
