<template>
  <div>
    <h2 >Board</h2> <p style="float: right">총 {{ forms.length }}개의 게시글이 있습니다.</p>

    글 작성하기

</div>
</template>
<script>
import { db } from '@/fdb'
import 'firebase/firebase-firestore'
// import { useRouter } from 'vue-router'

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
  async created () {
    const sn = db.collection('forms').doc('form.id')
    const doc = await sn.get()
    if (!doc.exists) {
      console.log('No such document!')
    } else {
      console.log('Document data:', doc.data())
    }
  }
}
</script>

<style>

</style>
