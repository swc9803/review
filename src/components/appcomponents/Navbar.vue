<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light ml-2">
    <router-link class="fa fa-home ml-4" :to="{ name: 'Home'}">
      Home
    </router-link>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Hot'}">
          <i class="fas fa-fire" style="color: red"></i>Hot
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Review'}">
          Review
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'PlzReview'}">
          PlzReview
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Board'}">
          Board
        </router-link>
      </li>
    </ul>
      <div v-if="user == ''">
        <button style="width:100px; height: 35px" @click="moveToLogin" class="fa fa-sign-in btn btn-primary mr-3">
          로그인
        </button>
        <div>
          <button style="width:100px; height: 35px" @click="moveToSignUp" class="btn btn-secondary">
            회원가입
          </button>
        </div>
      </div>
      <div v-else>
        <div class="mr-2">
          <p class="email"><i class="fas fa-user mr-1" style="color: blue"></i>{{ user.displayName }}님 안녕하세요</p>
        </div>
        <button class="btn btn-dark btn-block" style="width: 100px" @click="openModal">
          로그아웃
        </button>
      </div>
      <LogOutModal
        v-if="showModal"
        @close="closeModal"
        @logout="LogOut"
      />
  </nav>
</template>

<script>
import firebase from 'firebase'
import { ref } from 'vue'
import LogOutModal from '@/components/LogOutModal'
import { useRouter } from 'vue-router'

export default {
  data () {
    return {
      user: ''
    }
  },
  setup () {
    const router = useRouter()
    const showModal = ref(false)
    const openModal = () => {
      showModal.value = true
    }
    const closeModal = () => {
      showModal.value = false
    }
    const LogOut = async () => {
      await firebase.auth().signOut()
      closeModal()
      alert('로그아웃 되었습니다.')
      router.push({ name: 'Home' })
    }
    const moveToLogin = () => {
      router.push({
        name: 'Login'
      })
    }
    const moveToSignUp = () => {
      router.push({
        name: 'SignUp'
      })
    }
    return {
      showModal,
      openModal,
      closeModal,
      LogOut,
      moveToLogin,
      moveToSignUp
    }
  },
  components: {
    LogOutModal
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
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
  .nav-link {
    font-size: 20px;
    margin-left: 20px;
  }
  .email {
    font-size: 18px;
  }
</style>
