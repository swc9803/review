<template>
  <div>
    {{title}} {{content}} {{id}}
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import 'firebase/firebase-firestore'
import { db } from '@/fdb'

export default {
  props: {
    title: {
      type: String
    },
    id: {
      type: Number
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
  setup () {
    const route = useRoute()
    const getForm = async () => {
      await db.collection('forms').doc(route.params.id).onSnapshot(async (doc) => {
        const { title, content, createdAt } = await doc.data()
        console.log(title, content, createdAt)
      })
    }
    getForm()
  }
}
</script>

<style>

</style>
