<template>
    <div :key="Content">
      <img :src="Content"/>
    </div>
</template>

<script>

export default {
  data () {
    return {
      Content: [
        {
          Content: require('../assets/review.jpg')
        }
      ]
    }
  }
}
</script>

<style scoped>
content {
    padding: 10px;
    margin: 20px;
    border: black;
}
</style>
