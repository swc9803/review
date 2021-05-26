<template>
    <div class="signup">
      <p>Sign Up</p>
      <input class="left" type="text" style="width:300px" v-model="name" placeholder="성함"> <br>
      <input class="left" type="text" style="width:300px" v-model="email" placeholder="이메일"> <br>
      <input class="left" type="password" style="width:300px" v-model="password" placeholder="패스워드" @keypress.enter="SignUp"> <br>
      <button class="btn btn-primary" style="width:100px" @click="SignUp"><i class="glyphicon glyphicon-pencil"></i>회원가입</button>
      <h6>이미 가입된 아이디가 있으신가요?</h6>
      <router-link :to="{ name: 'Login'}">로그인 하러 가기</router-link>
    </div>
</template>

<script>
import { db, auth } from '@/fdb'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const currentDate = new Date()
    const createdAt = currentDate.getFullYear() + '.' + ('0' + (1 + currentDate.getMonth())).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2) + '  ' + ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + currentDate.getMinutes()).slice(-2) + ':' + ('0' + currentDate.getSeconds()).slice(-2)

    const SignUp = async () => {
      if (email.value === '' || password.value === '' || name.value === '') {
        alert('전부 입력해 주세요!')
      } else {
        const { user } = await auth.createUserWithEmailAndPassword(email.value, password.value)
        user.updateProfile({
          displayName: name.value
        })
        db.collection('users').doc(user.uid).set(
          {
            name: name.value, email: email.value, createdAt, uid: user.uid
          }
        )
        alert('회원가입 완료!')
        router.push({ name: 'Home' })
      }
    }
    return {
      SignUp,
      email,
      password,
      name
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
