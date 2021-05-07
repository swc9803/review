<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <router-link :to="{ name: 'Home'}">
      Home
    </router-link>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Review'}">
          Review
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
      <button class="btn btn-primary">
        <router-link class="Login" :to="{ name: 'Login'}">
          로그인
        </router-link>
      </button>
      <div>
        <button class="btn btn-secondary" style="width:100px">
          <router-link class="Login" :to="{ name: 'SignUp'}">
            회원가입
          </router-link>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-link {
  font-size: 20px;
  margin-left: 20px;
}
.Login {
  color: white;
}

</style>
