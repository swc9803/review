<template>
  <form>
    <label>Title</label>
    <div class="row">
      <div class="col-6">
        <input type="text" class="form-control" style="width: 300px" v-model="form.title">
      </div>
      <div class="col-12">
        <div class="form-group">
          <label>Content</label>
          <textarea class="form-control" cols="30" rows="10" v-model="form.content"></textarea>
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
      items: [],
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
    save (key) {
      firebase.firestore().collection('boards').doc(key)
        .update({
          title: this.title,
          content: this.content
        }).then(function () {
          alert('save')
        }).catch(function (error) {
          alert('Error : ' + error.message)
        })
      // this.$firebase.firestore().collection('boards').add(this.form)
    }
  }
}
</script>
<style>

</style>
