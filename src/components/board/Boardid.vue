<template>
  <Boardheader />
  <div class="btn">
    <Modal
      v-if="showModal"
      @close="closeModal"
      @delete="Deleteform"
    />
  </div>
  <br>
  <div>
    <Comment />
  </div>
</template>

<script>
import Boardheader from '@/components/board/Boardheader'
import { useRouter, useRoute } from 'vue-router'
import { db } from '@/fdb'
import Modal from '@/components/Modal'
import { ref } from 'vue'
import Comment from '@/components/Comment'

export default {
  data () {
    return {
      user: ''
    }
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const showModal = ref(false)

    const openModal = () => {
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
    }

    const Deleteform = async () => {
      await db.collection('forms').doc(route.params.id).delete().then(() => {
        alert('정상적으로 삭제되었습니다.')
        showModal.value = false
        router.push({
          name: 'Board'
        })
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    }
    const UpdateForm = () => {
      router.push({
        name: 'BoardEdit'
      })
    }

    return {
      showModal,
      openModal,
      closeModal,
      Deleteform,
      UpdateForm
    }
  },
  components: {
    Boardheader,
    Modal,
    Comment
  }
}
</script>

<style scoped>
  .btn {
    float: right;
    margin-right: 10%;
  }
</style>
