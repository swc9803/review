<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="nav-brand" :to="{ name: 'Home'}">
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
    </ul>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
.nav-link {
  color: greenyellow;
  font-size: 20px;
}
</style>
