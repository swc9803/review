<template>
  <div>
    <h2 >Board</h2> {{ id }}

    글 작성하기

</div>
</template>
<script>
import { db } from '@/fdb'
import 'firebase/firebase-firestore'

export default {
  title: 'Params',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 0
    }
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
