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
    cartItems: {name:'いちご'},
    // カートに入ってる商品

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
    },
    setCartItems(state, CItems) {
      state.cartItems = CItems
    },
    setCartItemList(state, CItemList){      
      state.cartItems.CartItem.cartItemList = CItemList      
    },

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
    fetchItems({ commit }){
      firebase
      .firestore()
      .collection(`Items`)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc=>{
          commit('fetchItems', doc.data())
        })
      })
    },

    setCartItemList({ getters, commit }, cartItemList ){
      if(getters.uid){        
        firebase
          .firestore()
          .collection(`users/${getters.uid}/carts`)
          .doc(getters.getCartItems.id)
          .update({ cartItemList })          
          .then( () => {                      
            commit("setCartItemList", cartItemList );
          });
      }else{ //ログインしてなくてもstoreに保存
        console.log('not login');
        commit("setCartItemList", cartItemList );
      }
    },

  },
  getters: {
    userName: state=>state.login_user? state.login_user.displayName:'',
    photoURL: state=>state.login_user? state.login_user.photoURL:'',
  
    getPizzas: state => state.itemList,
    getToppings: state => state.toppingList,
    getPizzasById: state => id => state.itemList.filter( i => id === i.id)[0],
    getToppingsById: state => id => state.toppingList.filter( i => id === i.id)[0],

    getCartItems: state => state.cartItems,
  },
})
