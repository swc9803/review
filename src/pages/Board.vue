<template>
<div class="container">
<h2>Board</h2>
  <button class="btn btn-outline-info" @click="moveToCreate">
    글 작성하기
  </button>
</div>
<hr>

<div
      v-for="form in forms" :key="form.id"
      class="card mt-2"
    >

      <div
        class="card-body p-2 d-flex align-items-center"
        @click="moveToPage(form.id)"
      >
    {{ form.title }} {{ form.content }}
      </div>
    </div>

</template>
<script>
import { db } from '@/fdb'
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

<style scoped>
 table, th, td {
  margin: auto;
  font-size: 20px;
  border: 1px solid;
 }

</style>
