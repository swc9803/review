<template>
  <div class="ss">
    <div class="form">
      <h1 class="mt-2">글 작성하기</h1>
      <hr>
      <form>
        <label>Title</label>
          <div class="row">
            <div class="col-6">
              <input type="text" class="form-control" style="width: 300px" v-model="title" required>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label>Content</label>
                <textarea class="form-control" cols="30" rows="10" v-model="content" required></textarea>
              </div>
            </div>
            <input type="file">
          </div>
      </form>
      <div v-if="user != ''">
        <button class="btn btn-primary" @click="savereview">저장</button>
        <button class="btn btn-outline-dark ml-2" @click="moveToReview">취소</button>
      </div>
      <div v-else class="card mt-2" style="text-align: center; color: white; background-color: gray">
        글을 작성하시려면 로그인을 해주세요!
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/fdb'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  data () {
    return {
      user: ''
    }
  },
  setup () {
    const router = useRouter()
    const currentDate = new Date()
    const createdAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)
    const updatedAt = createdAt
    const views = 0
    const title = ref('')
    const content = ref('')
    const file = ref('')

    const moveToReview = () => {
      router.push({
        name: 'Review'
      })
    }
    const savereview = async () => {
      if (title.value === '' || content.value === '') {
        alert('내용을 입력해주세요!')
      }
      const uid = auth.currentUser.uid
      const name = auth.currentUser.displayName
      await db.collection('reviews').add(
        {
          title: title.value, content: content.value, createdAt, updatedAt, uid, name, views, file: file.value
        }
      )
      alert('작성 완료!')
      router.push({
        name: 'Review'
      })
    }

    return {
      moveToReview,
      savereview,
      title,
      content,
      file
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
    margin-left: 60px;
  }
  .ss {
    width: 70%;
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
  }

</style>
