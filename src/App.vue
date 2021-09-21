<template>
  <div id="app">
    <div id="nav">
      <v-app-bar>
          <v-toolbar-items>
        <v-btn text @click="shop()">ショッピングカート</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text @click="login">ログイン</v-btn>
      </v-toolbar-items>
    </v-app-bar> 

    <sidenav/>
      <router-link to="/">Home</router-link> |
      <router-link to="/Search">商品検索</router-link> |
      <router-link to="/Details">商品詳細ページへ</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import sidenav from './components/Sidenav.vue'
import {mapActions} from 'vuex'
import firebase from "firebase";

export default ({
  name:'App',
  components:{
    sidenav
  },
  
  methods:{
    ...mapActions(['login','logout','setLoginUser','deleteLoginUser'])
  },
  created(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.setLoginUser(user)
      }else{
        this.deleteLoginUser
      }
    })
  }
  
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>