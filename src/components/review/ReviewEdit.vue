<template>
  <div>
    <div class="form">
    <h1 class="mt-2">글 수정하기</h1>
    <hr>
    <form>
      <label>Title</label>
        <div class="row">
          <div class="col-6">
            <input type="text" class="form-control mb-3" v-model="title" required>
          </div>
          <div>
            <div class="mb-3">
              <textarea class="form-control" cols="30" rows="10" style="width: 70%" v-model="content" placeholder="내용을 입력하세요" required></textarea>
            </div>
            <div>
              <input class="form-control form-control-sm" type="file" accept="image/*" @change="previewImage">
            </div>
            <div>
              <p>Progress: {{ uploadValue.toFixed()+"%" }}</p>
            </div>
          </div>
        </div>
    </form>
    <div v-if="user !=''">
      <div v-if="imageData!=null">
        <button class="btn btn-primary" @click="onUpload">저장</button>
        <button class="btn btn-outline-dark ml-2" @click="moveToReview">취소</button>
      </div>
      <div v-else>
        <div class="card mt-2" style="text-align: center; color: white; background-color: gray">
          이미지 첨부는 필수입니다!
        </div>
      </div>
    </div>
      <div v-else class="card mt-2" style="text-align: center; color: white; background-color: gray">
        글을 수정하시려면 로그인을 해주세요!
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth, storage } from '@/fdb'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  setup () {
    const router = useRouter()
    const title = ref('')
    const content = ref('')

    const moveToReview = () => {
      router.push({
        name: 'Review'
      })
    }

    return {
      moveToReview,
      title,
      content
    }
  },
  data () {
    return {
      user: '',
      imageData: null,
      picture: null,
      uploadValue: 0
    }
  },
  methods: {
    previewImage (event) {
      this.uploadValue = 0
      this.picture = null
      this.imageData = event.target.files[0]
    },
    onUpload () {
      this.picture = null
      const storageRef = storage.ref(`${this.user.uid}`).child(`${this.imageData.name}`).put(this.imageData)
      storageRef.on('state_changed', snapshot => {
        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, error => { console.log(error.message) },
      () => {
        this.uploadValue = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url
          const currentDate = new Date()
          const updatedAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)
          if (this.title === '' || this.content === '') {
            alert('내용을 전부 입력해주세요!')
          } else {
            db.collection('reviews').doc(this.$route.params.id).update(
              {
                title: this.title, content: this.content, updatedAt, url
              }
            )
            alert('수정 완료!')
            this.$router.push({
              name: 'Review'
            })
          }
        })
      })
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
</style>
