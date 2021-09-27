
<template>
  <div id="app">
    <div id="nav">
      <v-app-bar>
        <router-link to="/"><img class="header-logo" src="./assets/img/header_logo.png"></router-link>
      <v-toolbar-items>
        <v-btn to="/Cart">ショッピングカート</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text @click="login">ログイン</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text @click="test">テスト</v-btn>
      </v-toolbar-items>
    </v-app-bar> 

    <sidenav/>
      <router-link to="/">Home</router-link> |
      <router-link to="/Search">Search</router-link> |
      <router-link to='/cart'>Cart</router-link>
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
    ...mapActions(["toggleSideMenu", "setLoginUser", "logout", "login", "deleteLoginUser",
     "fetchItems","fetchCarts",'setCart']),

    test() {
    console.log(this.$store.state);
  }
  },
  created(){
    this.fetchItems();
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.setLoginUser(user);
        this.setCart();
      }else{
        this.deleteLoginUser();

      }
    })
  },
  
  
})

</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500;700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  // a {
  //   font-weight: bold;
  //   color: #2c3e50;

  //   &.router-link-exact-active {
  //     color: #42b983;
  //   }
  // }
  a {
  font-family: 'Ubuntu', sans-serif;;
  display: inline-block;
  position: relative;
  overflow: hidden;
  color: #2c3e50;
  text-decoration: none;

      &.router-link-exact-active {
      color: #42b983;
    }
}

a:after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color:  #2c3e50;
  transform: translate(-100%, 0);
  transition: transform cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s;
  content: "";
}

a:hover:after {
  transform: translate(0, 0);
}
}

.header-logo {
  width: 100%;
}
</style>

