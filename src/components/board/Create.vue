<template>
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
    <button type="submit" class="btn btn-primary" @click="save">Save</button>
    <button class="btn btn-outline-dark ml-2" @click="moveToBoard">Cancel</button>
  </form>
</template>

<script>
import firebase from 'firebase'

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
    save (e) {
      e.preventDefault()
      firebase.collection('forms').add(this.form).then(() => {
        alert('Saved!')
        this.user.name = ''
        this.user.email = ''
        this.user.phone = ''
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
