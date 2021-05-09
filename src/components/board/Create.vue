<template>
  <form>
    <label>Title</label>
    <div>
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
    <button class="btn btn-primary" @click="saveform">Save</button>
    <button class="btn btn-outline-dark ml-2" @click="moveToBoard">Cancel</button>
    </div>
  </form>
</template>

<script>
import db from '@/main.js'

export default {
  data () {
    return {
      form: {
      }
    }
  },
  methods: {
    moveToBoard () {
      this.$router.push({
        name: 'Board'
      })
    },
    saveform () {
      db.firestore().collection('form').add(this.form).then(() => {
        alert('Saved!')
        this.form.title = ''
        this.form.content = ''
      })
        .catch((error) => {
          alert('Error : ' + error.message)
        })
    }
  }
}
</script>
<style>

</style>
