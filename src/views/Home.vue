<template>
  <div>
    <button @click='login'>ログイン</button>
  </div>
</template>

<script>


import {mapActions} from 'vuex'
export default {
  name: 'Home',
  components: {
  },
  methods:{
    ...mapActions(['login'])
  }
}
</script>
