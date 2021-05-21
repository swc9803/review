<template>
  <div class="login">
    <p>Login</p>
    <input class="left" type="email" style="width:300px" v-model="user.email" placeholder="이메일"> <br>
    <input class="left" type="password" style="width:300px" v-model="user.password" placeholder="패스워드" @keypress.enter="Login"> <br>
    <button class="btn btn-primary" style="width:100px" @click="Login"><i class="glyphicon glyphicon-log-in"></i>로그인</button>
    <h6>아이디가 없으신가요? 회원가입을 해주세요</h6>
    <router-link :to="{ name: 'SignUp'}">회원가입 하러 가기</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async Login () {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
            alert('로그인 완료!')
            this.$router.push({ name: 'Home' })
          })
      } catch (err) {
        alert('에러 : ' + err.message)
      }
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
    margin-top: 40px;
    font-size: 15px;
  }
  input {
    margin: 10px;
    width: 20%;
    padding: 15px;
  }
    button {
    margin-top: 20px;
    width: 10%;
  }
  p {
    margin-top: 40px;
    font-size: 20px;
  }
  h6 {
    margin-top: 20px;
  }
</style>
