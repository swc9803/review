<template>
  <h1 class="ml-5">글 수정하기</h1>
  <hr>
  <div class="form">
    <form>
      <label>Title</label>
        <div class="row">
          <div class="col-6">
            <input type="text" class="form-control" style="width: 300px" v-model="form.title" required>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Content</label>
              <textarea class="form-control" cols="30" rows="10" style="width: 70%" v-model="form.content" required></textarea>
            </div>
          </div>
        </div>
    </form>
  <button class="btn btn-primary" @click="updateform">저장</button>
  <button class="btn btn-outline-dark ml-2" @click="moveToBoard">취소</button>
  </div>
</template>

<script>
import { db } from '@/fdb'
import { useRouter } from 'vue-router'
import firebase from 'firebase'

export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        updatedAt: '',
        uid: ''
      }
    }
  },
  setup () {
    const router = useRouter()

    const moveToBoard = () => {
      router.push({
        name: 'Board'
      })
    }
    return {
      moveToBoard
    }
  },
  methods: {
    async updateform () {
      const uid = firebase.auth().currentUser.uid
      const currentDate = new Date()
      const updatedAt = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate() + '  ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds()
      if (uid === '') {
        alert('로그인을 해주세요')
      } else {
        await db.collection('forms').doc(this.$route.params.id).update(
          {
            title: this.form.title, content: this.form.content, updatedAt
          }
        ).then(() => {
          alert('수정 완료!')
          this.$router.push({
            name: 'Board'
          })
        })
      }
    }
  }
}
</script>
<style scoped>
  .form {
    margin-left: 60px;
  }
</style>
