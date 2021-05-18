<template>
  <div>
    <h2 >Board</h2> {{ id }}
    {{title}} {{content}}
    <form>
      <div class="from-group">
        <label>form content</label>
      </div>
    </form>
</div>
</template>
<script>
import { useRoute } from 'vue-router'
import 'firebase/firebase-firestore'
import { db } from '@/fdb'

export default {
  props: {
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
