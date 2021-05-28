<template>
  <form class="form">
    <div class="title card mt-4">
      <div class="ml-2">{{ title }}<em v-if="createdAt !== updatedAt" class="badge bg-success" style="font-size: 17px">수정됨</em>
        <span class="badge badge-light mr-4 mt-2" style="float: right">{{ name }}</span> 조회수 {{ views }}
      <p v-if="createdAt !== updatedAt" class="date mr-3" style="text-decoration:underline">수정일 : {{ updatedAt }}</p>
      <p class="date mr-3">작성일 : {{ createdAt }}</p>
      </div>
    </div>
    <div class="card mt-4" style="height: 400px">
      <div class="ml-2">
        {{ content }}
      </div>
    </div>
    <div v-if="user.uid === uid" class="btn m-2">
      <router-link :to="{ name: 'BoardEdit'}"><button class="btn btn-secondary mr-0">수정</button></router-link>
      <button @click.prevent="openModal" class="btn btn-danger mr-3">삭제</button>
    </div>
  </form>
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
import { useRouter, useRoute } from 'vue-router'
import { db, auth } from '@/fdb'
import Modal from '@/components/Modal'
import { ref, onMounted } from 'vue'
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
    const uid = ref('')
    const name = ref('')
    const title = ref('')
    const content = ref('')
    const createdAt = ref('')
    const updatedAt = ref('')
    const views = ref('')

    onMounted(async () => {
      const forminfo = db.collection('forms').doc(route.params.id)
      const doc = await forminfo.get()
      uid.value = doc.data().uid
      name.value = doc.data().name
      title.value = doc.data().title
      content.value = doc.data().content
      createdAt.value = doc.data().createdAt
      updatedAt.value = doc.data().updatedAt
      views.value = doc.data().views
      await db.collection('forms').doc(route.params.id).update(
        {
          views: (views.value + 1)
        }
      )
    })

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
      UpdateForm,
      uid,
      name,
      title,
      content,
      createdAt,
      updatedAt,
      views
    }
  },
  components: {
    Modal,
    Comment
  },
  created () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = ''
      }
    })
  }
}
</script>

<style scoped>
  .date {
    text-align: right;
    font-size: 15px;
  }
  .title {
    background: lightgray;
  }
  .form {
    width: 70%;
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
  }
  .btn {
    float: right;
    margin-right: 10%;
  }
</style>
