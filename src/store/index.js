import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

const initialState = {
  Pizzas: [],
  Toppings: [{id:1, name:'トマト', priceM:200, priceL:300}],
}

export default new Vuex.Store({
  state: initialState,

  mutations: {
    fetchItems(state, Item){            
      state.Pizzas = Item.Pizza || state.Pizzas
      state.Toppings = Item.Topping || state.Toppings      
    },
  },

  actions: {
    login(){
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout() {
      firebase.auth().signOut()
    },

    fetchItems({ commit }){      
      firebase.firestore().collection(`Items`).get().then( querySnapshot => {                
        querySnapshot.forEach( doc => {             
          commit('fetchItems', doc.data())              
        })        
      })
    },
  },

  getters: {
    getPizzas: state => state.Pizzas,
    getToppings: state => state.Toppings,

    
    getPizzasById: state => id => state.Pizzas.filter( i => id === i.id)[0] ,
    getToppingsById: state => id => state.Toppings.filter( i => id === i.id)[0] ,
  }
})
