<template>
<div class="container">
<h2>Board</h2>
  <button class="btn btn-outline-info" @click="moveToCreate">
    글 작성하기
  </button>
</div>
<hr>

<div v-for="form in forms" :key="form.id" class="card mt-2">
  <div class="card-body p-2 d-flex align-items-center">
    {{ form.title }} {{ form.content }}
    <button class="ml-5" @click="del(form)">delete</button>
  </div>
</div>

</template>
<script>
import { db } from '@/fdb'
export default {
  data () {
    return {
      forms: [],
      title: '',
      content: ''
    }
  },
  methods: {
    moveToCreate () {
      this.$router.push({
        name: 'Create'
      })
    }
  },
  async created () {
    const sn = await db.collection('forms').get()
    sn.forEach(v => {
      const { title, content } = v.data()
      this.forms.push({
        title, content, id: v.id
      })
      console.log(v.id)
    })
  },
  // 삭제 구현
  del (form) {
    db.collection('forms').doc(form.id).delete()
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
