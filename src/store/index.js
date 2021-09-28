
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
    
    cartItems:[],
    // カートに入ってる商品

    carts: [],
    //お支払い情報を入れたカート
    midLogin:false

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
      state.cartItems = CItemList      
    },
    addCart(state, item) {
      state.carts.push(item)
    },
    addCartItem(state,{id,cartItem}){
      cartItem.id=id;
      state.cartItems=cartItem
    },
    setMidLogin(state, midBoolean){
      state.midLogin = midBoolean
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
    fetchCarts( { getters, commit }){            
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/carts`).get().then( querySnapshot => {              
          if(querySnapshot.empty){             
            console.log('empty');           
            this.dispatch('setCart') 
            commit('setMidLogin',false)
            querySnapshot.forEach( doc => {                   
              commit('fetchCarts', { CartItem: doc.data(), id: doc.id })
            })
          }       
          //データ登録が初めてじゃなくて、途中でログインした場合                    
          else if(JSON.parse(window.localStorage.getItem("carts")).midLogin){                      
            querySnapshot.forEach( doc => {  
              let lSCIL = JSON.parse(window.localStorage.getItem("carts")).CartItems.CartItem.cartItemList 
              commit('fetchCarts', { CartItem: doc.data(), id: doc.id }) 

              // cartの場合                
              if(doc.data().status == 0){                
                console.log('cart');
                this.dispatch('setCartItemList', lSCIL )
              }                 
            })                          
            commit('setMidLogin',false)
          }else{
            querySnapshot.forEach( doc => {                   
              commit('fetchCarts', { CartItem: doc.data(), id: doc.id })
            })        
          }          
        })
      }
    },

setCartItemList({ getters, commit }, cartItems ){
  console.log(this.state.cartItems);
      if(getters.uid){        
        firebase
          .firestore()
          .collection(`users/${getters.uid}/carts`)
          .doc(this.state.cartItems.id)
          .update({ cartItemList:getters.getCartItems.cartItemList })          
          .then( () => {                      
            commit("setCartItemList", cartItems);
          });
      }else{ //ログインしてなくてもstoreに保存
        console.log('not login');
        
        commit("setCartItemList", cartItems );
      }
    },
    setCart({ getters, commit }) {
      console.log('動いｔｒます');
      firebase
        .firestore()
        .collection(`users/${getters.uid}/carts`)
        .add({
          orderDate: "",
          userName: "",
          mailAddress: "",
          addressNumber: "",
          address: "",
          phoneNumber: "",
          deliveryDate: "",
          deliveryTime: "",
          status: 0,
          cartItemList: []
        }).then(doc => {
          commit("addCartItem", { id: doc.id, cartItem: {
          orderDate: "",
          userName: "",
          mailAddress: "",
          addressNumber: "",
          address: "",
          phoneNumber: "",
          deliveryDate: "",
          deliveryTime: "",
          status: 0,
          cartItemList: []
        } 
        })
        })
    },    

    addCart ({ commit }, item ) {
      commit ( "addCart", item )
    }

  },
  getters: {
    userName: state=>state.login_user? state.login_user.displayName:'',
    photoURL: state=>state.login_user? state.login_user.photoURL:'',
    uid: state => state.login_user ? state.login_user.uid : null,    
  
    getPizzas: state => state.itemList,
    getToppings: state => state.toppingList,
    getPizzasById: state => id => state.itemList.filter( i => id === i.id)[0],
    getToppingsById: state => id => state.toppingList.filter( i => id === i.id)[0],

    getCartItems: state => state.cartItems,

    getCarts: state => state.carts,
    midLogin: state => state.midLogin,
  },
})