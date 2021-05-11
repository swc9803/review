<template>
<div class="container">
<h2>Board</h2>
  <button class="btn btn-primary" @click="moveToCreate">
    글 작성하기
  </button>
</div>
<hr>

<tr v-for="form in forms" :key="form.id">
  <td> {{form.title}} </td>
  <td> {{form.content}} </td>
</tr>

</template>
<script>
import { db } from '@/fdb'
export default {
  name: 'forms',
  props: {
    msg: String
  },
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
    moveToCreate () {
      this.$router.push({
        name: 'Create'
      })
    }
  },
  created () {
    db.collection('forms').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        this.forms.push(doc.data())
      })
    })
  }
}
</script>

<style>

</style>
