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
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        updatedAt: ''
      }
    }
  },
  props: {
    title: String,
    content: String
  },
  setup (props) {
    const router = useRouter()
    const route = useRoute()

    const title = ref('')
    const content = ref('')
    const updatedAt = new Date()

    const moveToBoard = () => {
      router.push({
        name: 'Board'
      })
    }

    const updateform = async () => {
      await db.collection('forms').doc(route.params.id).set(
        {
          title, content, updatedAt
        }
      ).then(() => {
        alert('업데이트 완료!')
        router.push({
          name: 'Board'
        })
      })
    }
    return {
      moveToBoard,
      updateform
    }
  }
}
</script>
<style scoped>
  .form {
    margin-left: 60px;
  }
</style>
