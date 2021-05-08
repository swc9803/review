<template>
  <form>
    <label>Title</label>
    <button @click="read" class="btn btn-primary ml-4">Read</button>
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
    save () {
      this.$firebase.firestore().collection('boards').add(this.form)
    },
    async read () {
      const sn = await this.$firebase.firestore().collection('boards').get()
      this.items = sn.docs.map(v => {
        const item = v.data()
        return {
          id: v.id, title: item.title, content: item.content
        }
      })
      console.log(this.items)
    }
  }
}
</script>
<style>

</style>
