<template>
  <div>
    <h2>商品検索ページ</h2>

    <div>
      <input type="text" v-model="searchWord" placeholder="検索ワードを入れてね">
      <span>
        <button @click="searchItem">🔍</button>
      </span>
      <span>
        <button @click="trush">🗑</button>
      </span>
    </div>

    <hr class="horizon" width="500"	size="10" noshade="">

    <h3>商品一覧</h3>
      <div class="pizzaItem" v-for="item in getpizza"  :key="item.id" >
      <div>商品名 : {{item.name}}</div>
      <div @click="goDetails">{{item.img}}</div>
      <div>Mサイズ : {{item.MPrice}} 円</div>
      <div>Lサイズ : {{item.LPrice}} 円</div>
      <div>
        <button @click="goDetails">商品詳細へ</button>
      </div>
    </div>



  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      searchWord: '',
      itemWord:'',

    }
  },

  methods: {
    searchItems(){
      this.itemWord =this.searchWord
    },
    trush() {
      this.searchWord = '';
    },
    goDetails() {
      this.$router.push({ name:"Details" },()=>{})
    }

  },
  computed:{
    ...mapGetters(['getPizzas','getToppings']),
  getpizza(){
      if(this.searchWord==''){
        console.log(this.getPizzas);
        return [].concat(this.getPizzas)
      }else{
        return this.getPizzas.filter(pizza=>{
          return pizza.name.indexOf(this.searchWord)>=0
        })
      }
    }
  }
}
</script>

<style>
.horizon {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.pizzaItem{
    
    width: 50%;
    padding: 5%;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
    color: #6091d3;/*文字色*/
    background: #FFF;
    border: solid 3px #6091d3;/*線*/
    border-radius: 10px;/*角の丸み*/
}
</style>
