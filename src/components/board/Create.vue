<template>
<div class="container">
<h2>Board</h2>
    <form @submit.prevent="onSubmit">
        <div class="d-flex">
            <div class="flex-grow-1 mr-2">
                <input class="form-control" type="text" v-model="todo" placeholder="Type Todo">
            </div>
            <div>
                <button class="btn btn-primary" type="submit">
                    Add
                </button>
            </div>
        </div>
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
      },
      dialog: false
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    }
  }
}
</script>

<style>

</style>
