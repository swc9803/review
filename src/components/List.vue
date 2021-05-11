<template>
<tr v-for="form in forms" :key="form.id" class="card mt-2">
  <td> {{form.title}} </td>
  <td> {{form.content}} </td>
</tr>

<div
v-for="form in forms" :key="form.id" class="card mt-2"
>
<slot :form="form"></slot>
</div>

</template>

<script>
export default {
  name: 'forms',
  props: {
    msg: String
  },
  data () {
    return {
      forms: [],
      form: {
        title: '',
        content: ''
      }
    }
  }
}
</script>

<style>

</style>
