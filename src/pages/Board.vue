<template>
<div class="container">
<h2>Board</h2>
  <button class="btn btn-outline-info" @click="moveToCreate">
    글 작성하기
  </button>
</div>
<hr>
<table class="table table-hover text-center mt-4" style="width: 75%">
  <thead style="background: skyblue">
    <th style="width: 30%">제목</th> <th class="c">내용</th>
  </thead>
  <tbody>
    <tr v-for="form in forms" :key="form.id">
      <td> {{ form.title }}  </td>
      <td> {{ form.content }} </td>
    </tr>
  </tbody>
</table>

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
