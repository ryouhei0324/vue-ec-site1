import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user:null,
    shoppingCart:[],
    itemList:[],
    // firebaseピザ情報
    toppingList:[],
    // firebaseトッピング情報
    Toppings: [{id:1, name:'トマト', priceM:200, priceL:300}]
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    fetchItems(state,Item){
      state.itemList=Item.Pizza || state.itemList
      state.toppingList=Item.Topping || state.toppingList
    }

  },

  actions: {
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout() {
      firebase.auth().signOut();
    },
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    fetchItems({commit}){
      firebase.firestore().collection(`Items`).get().then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
          commit('fetchItems',doc.data())
        })
      })
    },

  },
  getters: {
    userName: state=>state.login_user? state.login_user.displayName:'',
    photoURL: state=>state.login_user? state.login_user.photoURL:'',


  

  
    getPizzas: state => state.itemList,
    getToppings: state => state.toppingList,

    
    getPizzasById: state => id => state.itemList.filter( i => id === i.id)[0] ,
    getToppingsById: state => id => state.toppingList.filter( i => id === i.id)[0] ,
  },
})
