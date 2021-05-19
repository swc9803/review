<template>
  <div>
    {{ id }}
    {{ title }}
    {{ document }}
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
      title: ''
    }
  },
  async created () {
    const route = useRoute()
    await db.collection('forms').doc(route.params.id).get().then(snapshot => {
      console.log(snapshot.data())
      return {
        title: snapshot.data().title,
        content: snapshot.data().content,
        createdAt: snapshot.data().createdAt
      }
    })
  }
}
</script>

<style>

</style>
