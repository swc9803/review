<template>
<div class="ss">
  <h1 class="ml-5">글 작성하기</h1>
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
              <textarea class="form-control" cols="30" rows="10" v-model="form.content" required></textarea>
            </div>
          </div>
        </div>
    </form>
  <button class="btn btn-primary" @click="saveform">저장</button>
  <button class="btn btn-outline-dark ml-2" @click="moveToBoard">취소</button>
  </div>
</div>
</template>

<script>
import { db } from '@/fdb'
import firebase from 'firebase'

export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        createdAt: '',
        updatedAt: '',
        uid: '',
        displayName: ''
      }
    }
  },
  methods: {
    moveToBoard () {
      this.$router.push({
        name: 'Board'
      })
    },
    async saveform () {
      const uid = firebase.auth().currentUser.uid
      const name = firebase.auth().currentUser.displayName
      const createdAt = new Date()
      const updatedAt = new Date()
      if (uid === '') {
        // alert('로그인을 먼저 해주세요')
      } else {
        await db.collection('forms').add( // this.form
          {
            title: this.form.title, content: this.form.content, createdAt, updatedAt, uid, name
          }
        ).then(() => {
          alert('작성 완료!')
          this.form.title = ''
          this.form.content = ''
          this.$router.push({
            name: 'Board'
          })
        }).catch((error) => {
          alert('Error : ' + error.message)
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
  .ss {
    width: 70%;
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
  }

</style>
