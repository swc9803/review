<template>
  <div class="center">
    <div class="form">
      <h1 class="mt-2">글 수정하기</h1>
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
                <textarea class="form-control" cols="30" rows="10" style="width: 70%" v-model="content" required></textarea>
              </div>
            </div>
          </div>
      </form>
      <button class="btn btn-primary" @click="updateform">저장</button>
      <button class="btn btn-outline-dark ml-2" @click="moveToBoard">취소</button>
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/fdb'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
    const uid = auth.currentUser.uid
    const currentDate = new Date()
    const updatedAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)
    const title = ref('')
    const content = ref('')

    const moveToBoard = () => {
      router.push({
        name: 'Board'
      })
    }

    const updateform = async () => {
      if (uid === '') {
        alert('로그인을 해주세요')
        router.push({
          name: 'Login'
        })
      } else {
        await db.collection('forms').doc(route.params.id).update(
          {
            title: title.value, content: content.value, updatedAt
          }
        )
        alert('수정 완료!')
        router.push({
          name: 'Board'
        })
      }
    }
    return {
      moveToBoard,
      updateform,
      title,
      content
    }
  }
}
</script>
<style scoped>
  .form {
    margin-left: 60px;
  }
  .center {
    width: 70%;
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
  }
</style>
