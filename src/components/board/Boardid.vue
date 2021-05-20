<template>
  <Boardheader />
  <!-- footer는 댓글 구현 -->
  <div>
    <button @click="openModal" class="btn btn-danger mr-5" style="float: right">삭제</button>
    <button @click="Updateform" class="btn btn-secondary mr-3" style="float: right">수정</button>
  </div>
  <!-- 삭제 모달창 -->
  <Modal
    v-if="showModal"
    @close="closeModal"
    @delete="Deleteform"
  />
</template>

<script>
import Boardheader from '@/components/board/Boardheader'
import { useRoute } from 'vue-router'
import { db } from '@/fdb'
import Modal from '@/components/Modal'
import { ref } from 'vue'

export default {
  setup () {
    const showModal = ref(false)

    const openModal = () => {
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
    }

    return {
      showModal,
      openModal,
      closeModal
    }
  },
  methods: {
    // setup에다 넣나?
    async Deleteform () {
      const route = useRoute()
      await db.collection('forms').doc(route.params.id).delete().then(() => {
        alert('삭제되었습니다.')
        // 이거 필요 한가?
        this.showModal.value = false
        this.$router.push({
          name: 'Board'
        })
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    UpdateForm () {

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
