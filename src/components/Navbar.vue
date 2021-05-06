<template>
  <ul class="navbar-nav">
    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Home'}">
        Homedd
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Review'}">
        Review
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'QnA'}">
        QnA
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {

}
</script>

<style>
.nav-link {
  color: greenyellow;
  font-size: 30px;
}
</style>
