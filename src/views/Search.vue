<template>
  <div>
    <h2>商品検索ページ</h2>

    
      <input v-model="searchWord" placeholder="検索ワードを入れてね">
      <button @click="searchItems" class="reserch">🔍</button>
      <button @click="trush">🗑</button>


    <h3>商品一覧</h3>
      <button type="button" @click="expensive">安い順</button>
      <button type="button" @click="cheap">高い順</button>
      <div  v-for="item in getpizza"  :key="item.id" >
      <div>商品名 : {{item.name}}</div>
      <div @click="goDetails(item.id)"><img :src="require('../assets/img/' + item.image)"></div>
      <div>Mサイズ : {{item.priceM}} 円</div>
      <div>Lサイズ : {{item.priceL}} 円</div>
      <div>
        <button @click="goDetails(item.id)">商品詳細へ</button>
      </div>
    </div>
      <div v-if="getpizza.length==0" class="nasi">該当する商品がありません</div>
      <div v-if="getpizza.length==0" class="nasi">内容にお間違いがないかもう一度ご確認ください</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      searchWord: '',
      itemWord:'',
      newpizza:[]
    }
  },

  methods: {
      ...mapGetters(['getPizzas','getToppings']),
    searchItems(){
      this.itemWord =this.searchWord
    },
    trush() {
      this.searchWord = ''
    },
    goDetails(id) {
      this.$router.push({ name:"Details",params:{id} })
    },
    expensive(){
      return this.getPizzas.sort((a,b)=>{
        return a.priceL-b.priceL
      })
    },
    cheap(){
      return this.getPizzas.sort((a,b) =>{
        return b.priceL - a.priceL
      })
    }

  },
  computed:{
    ...mapGetters(['getPizzas','getToppings']),
  getpizza(){
      if(this.itemWord==''){
        return this.newpizza.concat(this.getPizzas)
      }else{
        return this.getPizzas.filter(pizza=>{
          return pizza.name.indexOf(this.itemWord)>=0
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
