<template>
  <hr>
  <form class="form">
    <p style="font-size: 15px">00개의 댓글이 있습니다.</p>
    <!-- 여기 댓글 목록 -->
    <div v-if="user != ''" class="card" style="background-color: lightgray">
      <div class="ml-3 mt-2 mb-2">
        <span class="badge badge-pill badge-light" style="float: left">{{ user.displayName }}</span>
      </div>
      <div>
        <div>
          <textarea class="form-control col-11 ml-3" v-model="form.comment" placeholder="comment" required></textarea>
          <button class="btn btn-primary mr-2 mt-2 mb-2" style="float: right" @click="onSave">작성</button>
        </div>
      </div>
    </div>
    <div v-else>
      댓글을 작성하시려면 로그인을 해주세요.
    </div>
  </form>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/fdb'

export default {
  setup (props, { emit }) {
    const onSave = () => {
      emit('save')
    }
    return {
      onSave
    }
  },
  data () {
    return {
      form: {
        comment: '',
        createdAt: '',
        updatedAt: '',
        uid: '',
        displayName: ''
      },
      user: ''
    }
  },
  methods: {
    async saveComment () {
      const uid = firebase.auth().currentUser.uid
      const name = firebase.auth().currentUser.displayName
      const createdAt = new Date()
      const updatedAt = new Date()
      await db.collection('forms').doc(this.$route.params.id).collection('comments').add( // this.form
        {
          comment: this.form.comment, createdAt, updatedAt, uid, name
        }
      ).then(() => {
        alert('작성 완료!')
        this.form.comment = ''
        this.$router.push({
          name: 'Board'
          // 수정?
        })
      }).catch((error) => {
        alert('Error : ' + error.message)
      })
    }
  },
  async created () {
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
</style>
