<template>
  <form>
    <label>Title</label>
    <div class="row">
      <div class="col-6">
        <input type="text" class="form-control" style="width: 300px">
      </div>
      <div class="col-12">
        <div class="form-group">
          <label>Content</label>
          <textarea class="form-control" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">create</button>
    <button
      class="btn btn-outline-dark ml-2"
      @click="moveToBoard"
    >
      Cancel
    </button>
  </form>
</template>

<script>

export default {
  methods: {
    moveToCreate () {
      this.$router.push({
        name: 'Board'
      })
    }
  },
  setup () {
    return {

    }
  }
}
</script>

<style>

</style>
