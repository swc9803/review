<template>
<div class="container">
<h2>Board</h2>
  <button class="btn btn-primary" @click="moveToCreate">
    글 작성하기
  </button>
</div>

</template>

<script>

export default {
  methods: {
    moveToCreate () {
      this.$router.push({
        name: 'Create'
      })
    }
  }
}
</script>

<style>

</style>
