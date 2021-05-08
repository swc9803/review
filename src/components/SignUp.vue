<template>
    <div class="signup">
      <p>Sign Up</p>
      <input class="left" type="text" style="width:300px" v-model="email" placeholder="이메일"> <br>
      <input class="left" type="password" style="width:300px" v-model="password" placeholder="패스워드"> <br>
      <button class="btn btn-primary" style="width:100px" @click="SignUp">회원가입</button>
      <h6>이미 가입된 아이디가 있으신가요?</h6>
      <router-link :to="{ name: 'Login'}">로그인 하러 가기</router-link>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  setup () {

  },
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    SignUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          alert('회원가입완료')
        },
        this.$router.push({
          name: 'Home'
        }),
        function (err) {
          alert('에러 : ' + err.message)
        }
      )
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
  .signup {
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
