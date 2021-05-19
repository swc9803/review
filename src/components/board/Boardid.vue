<template>
  <div>
    {{ id }}
    {{ title }}
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import 'firebase/firebase-firestore'
import { db } from '@/fdb'

export default {
  props: ['id'],
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
    const route = useRoute()
    const forminfo = db.collection('forms').doc(route.params.id)
    const doc = await forminfo.get()
    console.log(doc.data().title)
  }
}
</script>

<style>

</style>
