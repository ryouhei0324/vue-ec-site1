<template>
  <div>
    <h2>商品検索ページ</h2>

    <div>
      <input type="text" v-model="searchWord" placeholder="検索ワードを入れてね">{{searchWord}}
      <span>
        <button>🔍</button>
      </span>
      <span>
        <button @click="trush">🗑</button>
      </span>
    </div>

    <hr width="500"	size="10" noshade="">

    <h3>商品一覧</h3>

    <!-- <div v-if="pizza">
      該当商品がありません
    </div>
    <div v-if="pizza">
      内容にお間違いがないかもう一度ご確認ください
    </div> -->
    

    <div class="pizzaItem" v-for="item in items" :value="items" :key="item.id" >
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
export default {
  data () {
    return {
      searchWord: '',
      itemWord:'',
      items: [{
        img: '画像',
        name: 'まるげ',
        MPrice: 1000,
        LPrice: 1500,
      }]

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

  }
}
</script>

<style>

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
