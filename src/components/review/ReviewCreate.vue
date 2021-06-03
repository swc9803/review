<template>
  <div class="ss">
    <div class="form">
      <h1 class="mt-2">글 작성하기</h1>
      <hr>
      <form>
        <label>Title</label>
          <div class="row">
            <div>
              <input type="text" class="form-control mb-3" v-model="title" required>
            </div>
            <div>
              <div class="mb-3">
                  <!-- placeholder="내용을 입력하세요" v-model="contentt"  style="min-height: 150px" required -->
                <textarea class="form-control" cols="30" rows="10" v-model="content" placeholder="내용을 입력하세요" required></textarea>
              </div>
              <div>
                <input type="file" accept="image/*" @change="previewImage">
              </div>
              <div>
                <p>Progress: {{ uploadValue.toFixed()+"%" }}
                <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
              </div>
            </div>
          </div>
      </form>
      <div v-if="user != ''">
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
        글을 작성하시려면 로그인을 해주세요!
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
    const likeCount = 0
    const dislikeCount = 0
    const likeuid = []
    const user = auth.currentUser

    const moveToReview = () => {
      router.push({
        name: 'Review'
      })
    }

    return {
      moveToReview,
      title,
      content,
      likeCount,
      dislikeCount,
      likeuid,
      user
    }
  },
  name: 'Upload',
  data () {
    return {
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
          const createdAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)
          const updatedAt = createdAt
          const views = 0
          const likeCount = 0
          const dislikeCount = 0
          const likeuid = []
          if (this.title === '' || this.content === '') {
            alert('내용을 전부 입력해주세요!')
          } else {
            const uid = auth.currentUser.uid
            const name = auth.currentUser.displayName
            db.collection('reviews').add(
              {
                title: this.title, content: this.content, createdAt, updatedAt, uid, name, views, likeCount, dislikeCount, likeuid, url
              }
            )
            alert('작성 완료!')
            this.$router.push({
              name: 'Review'
            })
          }
        })
      })
    }
  }
  // components: {
  //   VueEditor
  // }
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

  img.preview {
      width: 200px;
  }

</style>
