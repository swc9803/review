<template>
  <Boardheader />
  <!-- footer는 댓글 구현 -->
  <div>
    <button @click="openModal" class="btn btn-danger mr-5" style="float: right">삭제</button>
    <router-link :to="{ name: 'BoardEdit'}"><button class="btn btn-secondary mr-3" style="float: right">수정</button></router-link>
  </div>
  <Modal
    v-if="showModal"
    @close="closeModal"
    @delete="Deleteform"
  />
</template>

<script>
import Boardheader from '@/components/board/Boardheader'
import { useRouter, useRoute } from 'vue-router'
import { db } from '@/fdb'
import Modal from '@/components/Modal'
import { ref } from 'vue'

export default {
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
    Modal
  }
}
</script>

<style>

</style>
