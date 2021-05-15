<template>
<h1 class="ml-5">문서 수정하기</h1>
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
<button class="btn btn-primary" @click="updateform">Update</button>
<button class="btn btn-outline-dark ml-2" @click="moveToBoard">Cancel</button>
</div>
</template>

<script>
import { db } from '@/fdb'
import 'firebase/firebase-firestore'

export default {
  data () {
    return {
      forms: [],
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    moveToBoard () {
      this.$router.push({
        name: 'Board'
      })
    },
    async updateform () {
      await db.collection('forms').doc('HWecZ5AgYmQFB5ntb88R').set( // this.form
        {
          title: this.form.title, content: this.form.content
        }
      ).then(() => {
        alert('Saved!')
        this.$router.push({
          name: 'Board'
        })
      })
        .catch((error) => {
          alert('Error : ' + error.message)
        })
    }
  }
}
</script>
<style scoped>
  .form {
    margin-left: 60px;
  }
</style>
