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
            <form @submit.prevent="deleteComment(form.id)">
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
import { db, auth } from '@/fdb'
// import { ref } from 'vue'
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
  // setup () {
  //   const router = useRouter()
  //   const route = useRoute()
  //   const uid = auth.currentUser.uid
  //   const name = auth.currentUser.displayName
  //   const currentDate = new Date()
  //   const createdAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)
  //   const updatedAt = createdAt
  //   const comment = ref('')

  //   const saveComment = async () => {
  //     if (comment.value === '') {
  //       alert('내용을 입력해주세요')
  //     } else {
  //       const formSnap = await db.collection('forms').doc(route.params.id).collection('comments').add(
  //         {
  //           comment: comment.value, createdAt, updatedAt, uid, name
  //         }
  //       )
  //       comment.value = ''
  //       router.go(router.currentRoute)
  //       return formSnap.id
  //     }
  //   }
  //   return {
  //     saveComment,
  //     comment
  //   }
  // },
  methods: {
    async saveComment () {
      const uid = auth.currentUser.uid
      const name = auth.currentUser.displayName
      const currentDate = new Date()
      const createdAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)
      const updatedAt = createdAt
      if (this.form.comment === '') {
        alert('내용을 입력해주세요')
      } else {
        const formSnap = await db.collection('forms').doc(this.$route.params.id).collection('comments').add( // this.form
          {
            comment: this.form.comment, createdAt, updatedAt, uid, name
          }
        )
        this.form.comment = ''
        this.$router.go(this.$router.currentRoute)
        return formSnap.id
      }
    },
    async deleteComment (fID) {
      await db.collection('forms').doc(this.$route.params.id).collection('comments').doc(fID).delete()
      alert('정상적으로 삭제되었습니다.')
      this.$router.go(this.$router.currentRoute)
    }
  },
  async created () {
    const sn = await db.collection('forms').doc(this.$route.params.id).collection('comments').orderBy('createdAt', 'desc').get()
    sn.forEach(v => {
      const { comment, createdAt, name, uid } = v.data()
      const id = v.id
      this.forms.push({
        comment, id, createdAt, name, uid
      })
    })
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
</style>
