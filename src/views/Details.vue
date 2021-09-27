<template>
  <div>
    <div>
      <button @click="backPage()">戻る</button>
    </div>

    <h2>商品詳細ページ</h2>

    <div>
      <div>商品名 : {{ getPizzasById (this.$route.params.id).name }}</div>
      <div><img :src="require('../assets/img/' + getPizzasById (this.$route.params.id).image)"></div>
      <div>商品の説明 : {{ getPizzasById (this.$route.params.id).explain }}</div>
    </div>

    <hr class="horizon2" width="500" size="10" noshade="" />

    <div>
      サイズ&nbsp;
      <span>
        <span class="valueM"><input type="radio" :value="getPizzasById(this.$route.params.id).priceM" name="size" id="M" @click="totalPrice()"><label for="M"> Mサイズ : {{getPizzasById(this.$route.params.id).priceM}} 円</label></span>
      </span>&nbsp;&nbsp;
      <span>
        <span class="valueL"><input checked type="radio" :value="getPizzasById(this.$route.params.id).priceL" name="size" id="L" @click="totalPrice()"><label for="L"> Lサイズ : {{getPizzasById(this.$route.params.id).priceL}} 円</label></span>
      </span>
    </div>

    <div>
      <div>トッピングを選択</div>
      <span
        class="container"
        v-for="item in getToppings"
        :value="getToppings"
        :key="item.id"
      >
        <input type="checkbox"  name="topping" :value="item.id" :id="item.id" @click="totalPrice()" >&nbsp;{{item.name}}
      </span>
    </div>

    <div>
      <div>
        <span class="number"
          >枚数 :
          <select name="num" id="num" @change="totalPrice()">
            <option value="0">枚数の選択</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </span>
      </div>
    </div>

    <div>
      <div>合計 (税抜き) : {{finalPrice[0]}} 円</div>
      <div>消費税 : {{finalPrice[1]}} 円</div>
      <div>合計金額 : {{finalPrice[2]}} 円</div>
    </div>

    <hr class="horizon2" width="500" size="10" noshade="" />

    <div>
      <button class="cP" @click="cartPage">カートに入れます！</button>
    </div>

    <div class="Page-Btn" @click="scrollTop">
      <img class="scrollImg" src="https://jbit.bufs.ac.kr/~group2002s2/image/upmark.png">
    </div>


  </div>
</template>





<script>
import { mapGetters,mapActions } from "vuex"



export default {
computed:{
        ...mapGetters(['getPizzas','getToppings','getPizzasById', 'getToppingsById', 'getCartItems']),
    },
    // created(){
    //   this.$router.push({name:'Search'})
    // },

  data() {
    return {
      item: {
        img: "require('../assets/img/1.jpg/')",
        name: "まるげ",
        topping: "ちーずたっぷり、バジル乗ってる",
        priceM: 1500,
        priceL: 2000,
      },

      pSize:'',
      tSelect:[],
      toppingPrice: 0,
      finalPrice: [],
      number: 0,
    };
  },

  methods: {
 ...mapActions(['setCartItemList']), 

    backPage() {
      this.$router.push({ name: "Search" }, () => {});
    },

    //カートへ送る情報 pizzaid, toppingid, number(個数), price(トッピング込みのピザの値段)
    cartPage() {
      if (this.number <= 0) {
        alert ("個数を選択してください")
        return
      }
      



      // let sCIL = this.getCartItems.CartItem ? this.getCartItems.CartItem.cartItemList.concat() : []  
      // sCIL.push({
      //   pizzaid: this.$route.params.id, //選んだピザのid
      //   toppingid: this.tSelect, //選んだトッピングのid
      //   number: this.number, //個数
      //   price:  this.pSize, //Mサイズ or Lサイズの値段                
      // }),

      let sCIL = this.getCartItems.CartItem ? this.getCartItems.CartItem.cartItemList.concat():[]
        sCIL.push({
        pizzaid: this.$route.params.id, //選んだピザのid
        toppingid: this.tSelect, //選んだトッピングのid
        number: this.number, //個数
        price:  this.pSize, //Mサイズ or Lサイズ               
      })
      console.log(sCIL);

      this.setCartItemList(sCIL)
      console.log(this.getCartItems);
      this.$router.push({ name: "Cart" }, () => {});
    },



    totalPrice() {
      let tax = 0.1; //消費税
      let p = 0;

      let pizzaSize = document.getElementsByName("size"); //チェック済みのラジオボタンを調べて値を取得
      console.log(pizzaSize);
      for (let i = 0; i < pizzaSize.length; i++) {
        if (pizzaSize[i].checked) {
          p = pizzaSize[i].value * 1;
          if ( pizzaSize[i].value == this.getPizzasById(this.$route.params.id).priceM){
          this.pSize='priceM' 
          console.log(this.pSize);
          } else if (pizzaSize[i].value ==this.getPizzasById(this.$route.params.id).priceL){
            this.pSize = "priceL";
            console.log(this.pSize);
          }
        }
      }

      if (!this.pSize) {
        return;
      }

      let toppingSelect = document.getElementsByName("topping");
      let tSelect2 = [];
      console.log(tSelect2);
      for (let j = 0; j < toppingSelect.length; j++) {
        if (toppingSelect[j].checked) {
          p += this.getToppingsById(toppingSelect[j].value * 1)[this.pSize] * 1;
          tSelect2.push(this.getToppings[j].id);
        }
      }

      this.tSelect = tSelect2;
      this.number = document.getElementById("num").selectedIndex
      console.log(this.number);
      let price = p * this.number; // 数量×単価
      let tax2 = Math.round(price * tax); //消費税を計算
      let total2 = price + tax2; //税込み合計を計算
      //表示用の金額を3桁区切りに変換
      let data = new Array(price, tax2, total2); //金額が配列になる
      //フォームのテキストエリアに表示する金額
      //date[] から取り出す
      this.finalPrice = data;
    },

    scrollTop: function () {
            window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    },

  },
};
</script>


<style>
.horizon2 {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
}

.cP {
  margin-bottom: 5%;
}

.Page-Btn {
    position: fixed;
    right: 7%;
    bottom: 12%;
    width: 20px;
    height: 30px;
}
.scroll {
    color: rgb(241, 237, 233);
}
.scrollImg {
    width: 300%;
}

</style>
