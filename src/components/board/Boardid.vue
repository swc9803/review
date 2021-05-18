<template>
  <div>
    {{id}}
    <div class="card-body p-2" style="cursor: pointer"> {{ title }}</div>
    {{ document }}
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import 'firebase/firebase-firestore'
import { db } from '@/fdb'
// import { ref } from 'vue'

export default {
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    createdAt: {
      type: Number
    },
    id: {
      type: Number
    }
  },
  async created () {
    const route = useRoute()
    await db.collection('forms').doc(route.params.id).get().then(snapshot => {
      const title = snapshot.data().title
      const content = snapshot.data().content
      const createdAt = snapshot.data().createdAt
      console.log(title, content, createdAt)
    })
  }
}
</script>

<style>

</style>
