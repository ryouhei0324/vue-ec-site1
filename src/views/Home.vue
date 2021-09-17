<template>
  <div>
    <!-- <button @click='login'>ログイン</button>
    <button @click='logout'>ログアウト</button> -->
  </div>
</template>

<script>

import {mapActions} from 'vuex'
export default {
  name: 'Home',
  components: {
  },
  methods:{
    ...mapActions(['login','logout'])
  }
}
</script>
