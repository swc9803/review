<template>
  <Navbar id="nav"/>
  <div>
    <router-view/>
  </div>
  <div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/appcomponents/Navbar'
import Footer from '@/components/appcomponents/Footer'

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
</style>
