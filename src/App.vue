<template>
  <Navbar id="nav"/>
  <div>
    <router-view/>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Navbar,
    Footer
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
  font-size: 25px;
  padding: 5px;
}

#nav {
  background: darkcyan;
  color: white;
  padding: 10px;
}

</style>
