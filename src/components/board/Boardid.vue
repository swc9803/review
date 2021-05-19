<template>
  <Boardheader />
  <!-- footer는 댓글 구현 -->
  <div>
    <button @click="Deleteform" class="btn btn-danger mr-5" style="float: right">삭제</button>
    <button @click="Updateform" class="btn btn-secondary mr-3" style="float: right">수정</button>
  </div>
  <!-- 삭제 모달창 -->
</template>

<script>
import Boardheader from '@/components/board/Boardheader'
import { useRoute } from 'vue-router'
import { db } from '@/fdb'

export default {
  methods: {
    async Deleteform () {
      const route = useRoute()
      await db.collection('forms').doc(route.params.id).delete().then(() => {
        alert('삭제되었습니다.')
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
    Boardheader
  }
}
</script>

<style>

</style>
