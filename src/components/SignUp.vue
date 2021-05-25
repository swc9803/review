<template>
    <div class="signup">
      <p>Sign Up</p>
      <input class="left" type="text" style="width:300px" v-model="user.name" placeholder="성함"> <br>
      <input class="left" type="text" style="width:300px" v-model="user.email" placeholder="이메일"> <br>
      <input class="left" type="password" style="width:300px" v-model="user.password" placeholder="패스워드" @keypress.enter="SignUp"> <br>
      <button class="btn btn-primary" style="width:100px" @click="SignUp"><i class="glyphicon glyphicon-pencil"></i>회원가입</button>
      <h6>이미 가입된 아이디가 있으신가요?</h6>
      <router-link :to="{ name: 'Login'}">로그인 하러 가기</router-link>
    </div>
</template>

<script>
import { db } from '@/fdb'
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async SignUp () {
      if (this.user.email === '' || this.user.password === '' || this.user.name === '') {
        alert('전부 입력해 주세요!')
      } else {
        await firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then((res) => {
            res.user.updateProfile({
              displayName: this.user.name
            })
            const uid = firebase.auth().currentUser.uid
            const currentDate = new Date()
            const createdAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)
            db.collection('users').add(
              {
                name: this.user.name, email: this.user.email, createdAt, uid
              }
            )
            alert('회원가입 완료!')
            this.$router.push({ name: 'Home' })
          })
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
