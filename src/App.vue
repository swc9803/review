<template>
  <div>
    <div id="nav">
      <Navbar />
      <router-view/>
    </div>
    <Content msg="내용입니다."/>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Content from '@/components/Content'

export default {
  name: 'Home',
  components: {
    Navbar,
    Footer,
    Content
  }
}

</script>

<style>

#app {
  font-family: Avenir,
  Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 20px;
  font-size: 20px;
  padding: 10px;
}

#nav {
  background: darkcyan;
  color: white;
  padding: 15px;
}

</style>
