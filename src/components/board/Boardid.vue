<template>
{{collection}}
{{document}}
</template>

<script>
export default {
  computed: {
    collection () {
      return this.$route.params.collection
    },
    document () {
      return this.$route.params.document
    }
  }
}
</script>

<style>

</style>
