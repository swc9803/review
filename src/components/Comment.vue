<template>
  <hr>
  <form class="form">
    <p style="font-size: 15px">{{ forms.length }} 개의 댓글이 있습니다.</p>
    <form>
      <div>
        <div v-for="form in forms" :key="form.id" class="card mb-3"  style="background-color: lightgray">
          <div>
            <span class="badge badge-light ml-3 mt-2 mb-1">{{ form.name }}</span>
          </div>
          <p class="ml-3 mt-1">{{ form.comment }}</p>
          <p class="ml-3" style="font-size: 15px">작성일 : {{ form.createdAt }}</p>
          <div v-if="user.uid === form.uid">
            <form @submit.prevent="deleteComment">
              <button class="btn btn-danger p-2 mr-3 mb-2" type="submit" style="float: right"><i class="fas fa-trash text-red-400 p-2 rounded-full hover:bg-red-50"></i></button>
            </form>
          </div>
        </div>
      </div>
    </form>
    <div v-if="user != ''" class="card" style="background-color: lightgray">
      <div class="ml-3 mt-2 mb-2">
        <span class="badge badge-pill badge-light" style="float: left">{{ user.displayName }}</span>
      </div>
      <form @submit.prevent="saveComment">
        <div>
          <textarea class="form-control col-11 ml-3" v-model="form.comment" placeholder="comment" required></textarea>
          <button type="submit" class="btn btn-primary mr-2 mt-2 mb-2" style="float: right">작성</button>
        </div>
      </form>
    </div>
    <div v-else class="card mt-5" style="text-align: center; color: white; background-color: gray">
      댓글을 작성하시려면 로그인을 해주세요!
    </div>
  </form>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/fdb'
// import { useRoute, useRouter } from 'vue-router'

export default {
  data () {
    return {
      forms: [],
      form: {
        createdAt: '',
        updatedAt: '',
        uid: '',
        displayName: '',
        comment: ''
      },
      user: ''
    }
  },
  methods: {
    async deleteComment () {
      // const sn = db.collection('forms').doc(this.$route.params.id).collection('comments').doc()
      // sn.delete()
      // console.log(sn.data())
      // await db.collection('forms').doc(this.$route.params.id).collection('comments').doc().delete()

      // db.collection('forms').doc(this.$route.params.id).collection('comments').doc(this.form.id).delete()
    },
    async saveComment () {
      const uid = firebase.auth().currentUser.uid
      const name = firebase.auth().currentUser.displayName
      const currentDate = new Date()
      const createdAt = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate() + '  ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds()
      const updatedAt = createdAt
      if (this.form.comment === '') {
        alert('내용을 입력해주세요')
      } else {
        await db.collection('forms').doc(this.$route.params.id).collection('comments').doc().set( // this.form
          {
            comment: this.form.comment, createdAt, updatedAt, uid, name
          }
        ).then(() => {
          this.form.comment = ''
          this.$router.go(this.$router.currentRoute) // 강제새로고침시키기
        })
      }
    }
  },
  async created () {
    const sn = await db.collection('forms').doc(this.$route.params.id).collection('comments').orderBy('createdAt', 'desc').get()
    sn.forEach(v => {
      const { comment, createdAt, name, uid } = v.data()
      this.forms.push({
        comment, id: v.id, createdAt, name, uid
      })
    })
    firebase.auth().onAuthStateChanged((user) => {
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
</style>
