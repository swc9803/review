<template>
    <div class="login">
        <h3>Login</h3>
        <input class="left" type="text" placeholder="이메일"> <br>
        <input class="left" type="password" placeholder="패스워드"> <br>
        <button @click="Login">로그인</button>
        <h6>아이디가 없으신가요? 회원가입을 해주세요</h6>
        <router-link :to="{ name: 'SignUp'}">회원가입 하러 가기</router-link>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    }
  },
  methods: {
    Login () {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
    * {
        text-align: center;
    }
    .left {
        text-align: left;
    }
    .login {
        margin-top: 10px;
    }
    input {
        margin: 10px;
        width: 20%;
        padding: 15px;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    p {
        margin-top: 40px;
        font-size: 15px;
    }
    p a{
        text-decoration: underline;
        cursor: pointer;
    }
</style>
