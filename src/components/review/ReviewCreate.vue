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
                <!-- <QuillEditor
                  placeholder="내용을 입력하세요" v-model="contentt"  style="min-height: 150px" required
                  :toolbar="[{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }, 'bold', 'italic', 'underline', { 'align': [] }, 'strike', { 'color': [] }, { 'background': [] }, 'image']"
                />
                <button @click.prevent="read">read</button> -->
                <textarea class="form-control" cols="30" rows="10" v-model="content" placeholder="내용을 입력하세요" required></textarea>
              </div>
              <!-- <input type="file" accept="image/*" @change="fileInput"> -->
            </div>
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
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  setup () {
    const router = useRouter()
    const currentDate = new Date()
    const createdAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)
    const updatedAt = createdAt
    const views = 0
    const title = ref('')
    const content = ref('')
    const contentt = ref('')
    const likeCount = 0
    const dislikeCount = 0
    const likeuid = []
    const user = auth.currentUser

    const read = () => {
      console.log(title)
      console.log(content)
      console.log(contentt)
    }
    const moveToReview = () => {
      router.push({
        name: 'Review'
      })
    }
    const savereview = async () => {
      if (title.value === '' || content.value === '') {
        alert('내용을 전부 입력해주세요!')
      } else {
        const uid = auth.currentUser.uid
        const name = auth.currentUser.displayName
        await db.collection('reviews').add(
          {
            title: title.value, content: content.value, createdAt, updatedAt, uid, name, views, likeCount, dislikeCount, likeuid
          }
        )
        alert('작성 완료!')
        router.push({
          name: 'Review'
        })
      }
    }

    return {
      moveToReview,
      savereview,
      title,
      content,
      likeCount,
      dislikeCount,
      likeuid,
      user,
      read,
      contentt
    }
  }
  // components: {
  //   QuillEditor
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

</style>
