import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/app'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBXP5vedAOrgtdWLskCThdubxeJ9iT_ZdU",
  authDomain: "vue-ec-site1.firebaseapp.com",
  projectId: "vue-ec-site1",
  storageBucket: "vue-ec-site1.appspot.com",
  messagingSenderId: "22481578749",
  appId: "1:22481578749:web:193f0bf93444139a476c94",
  measurementId: "G-TQ5TM8XEFB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



new Vue({
  router,
  store,
  render: h => h(App),
  vuetify,
}).$mount('#app')
