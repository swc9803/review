<template>
    <div>
        {{ msg }}
    </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    msg: String
  }
}
</script>

<style scoped>
content {
    padding: 10px;
    margin: 20px;
}
</style>
