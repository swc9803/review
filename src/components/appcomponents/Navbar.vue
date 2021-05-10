<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light ml-2">
    <router-link class="fa fa-home ml-4" :to="{ name: 'Home'}">
      Home
    </router-link>
    <ul class="navbar-nav mr-auto">
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
        <router-link class="nav-link" :to="{ name: 'Hot'}">
          <i class="fas fa-fire"></i>Hot
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'QnA'}">
          QnA
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Board'}">
          Board
        </router-link>
      </li>
    </ul>
      <div>
<button style="width:100px; height: 35px" @click="moveToLogin" class="fa fa-sign-in btn btn-primary mr-3">
          로그인
        </button>
        <div>
        <button style="width:100px; height: 35px" @click="moveToSignUp" class="btn btn-secondary">
          회원가입
        </button>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  methods: {
    moveToLogin () {
      this.$router.push({
        name: 'Login'
      })
    },
    moveToSignUp () {
      this.$router.push({
        name: 'SignUp'
      })
    }
  }
}
</script>

<style scoped>
.nav-link {
  font-size: 20px;
  margin-left: 20px;
}
i {
  color: red;
}

</style>
