<template>
  <div>
    <div>
      <button @click="backPage()">戻る</button>
    </div>

    <h2>商品詳細ページ</h2>

    <div>
      <div>商品名 : {{ item.pizzaName }}</div>
      <div>商品画像 : {{ item.img }}</div>
      <div>商品の説明 : {{ item.topping }}</div>
    </div>

    <hr class="horizon2" width="500" size="10" noshade="" />

    <div>
      サイズを選ぶ
      <span
        ><input type="radio" :value="1500" name="size" id="Msize" @click="totalPrice()"/>&nbsp;<label for="Msize"
          >Mサイズ : {{item.priceM}}</label
        ></span
      >
      <span
        ><input type="radio" :value="2000" name="size" id="Lsize" @click="totalPrice()" />&nbsp;<label for="Lsize"
          >Lサイズ : {{item.priceL}} </label
        ></span
      >
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
        何個買うのか
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

    <div>
      <button @click="cartPage">カートに入れます！</button>
    </div>
  </div>
</template>





<script>
import { mapGetters } from "vuex"


export default {
computed:{
        ...mapGetters(['getPizzas','getToppings','getPizzasById', 'getToppingsById','getCartItems']),
    },

  data() {
    return {
      item: {
        img: "画像がくるよ",
        pizzaName: "まるげ",
        topping: "ちーずたっぷり、バジル乗ってる",
        price: 1000,
        priceM: 1500,
        priceL: 2000,
      },

      // topping: ["ちーず", "トマト", "えび"],

      pSize:'',
      tSelect:[],
      toppingPrice: 0,
      finalPrice: [],
      number: 0,
    };
  },

  methods: {
    backPage() {
      this.$router.push({ name: "Search" }, () => {});
    },
    cartPage() {
      if (this.number <= 0) {
        alert ("個数を選択してください")
        return
      }
      this.$router.push({ name: "Home" }, () => {});
    },

    totalPrice() {
      let tax = 0.1; //消費税
      let p = 0;

      let pizzaSize = document.getElementsByName("size"); //チェック済みのラジオボタンを調べて値を取得

      for (let i = 0; i < pizzaSize.length; i++) {
        if (pizzaSize[i].checked) {
          p = pizzaSize[i].value * 1;
          if (
            pizzaSize[i].value ==
            // this.getPizzasById(this.$route.params.id).priceM
            this.item.priceM
          ) {
            this.pSize = "priceM";
          } else if (
            pizzaSize[i].value ==
            // this.getPizzasById(this.$route.params.id).priceL
            this.item.priceL
          ) {
            this.pSize = "priceL";
          }
        }
      }

      if (!this.pSize) {
        return;
      }

      let toppingSelect = document.getElementsByName("topping");
      let tSelect2 = [];
      for (let j = 0; j < toppingSelect.length; j++) {
        if (toppingSelect[j].checked) {
          p += this.getToppingsById(toppingSelect[j].value * 1)[this.pSize] * 1;
          tSelect2.push(this.getToppings[j].id);
        }
      }

      this.tSelect = tSelect2;
      this.number = document.getElementById("num").selectedIndex;

      let price = p * this.number; // 数量×単価
      let tax2 = Math.round(price * tax); //消費税を計算
      let total2 = price + tax2; //税込み合計を計算
      //表示用の金額を3桁区切りに変換
      let data = new Array(price, tax2, total2); //金額が配列になる
      //フォームのテキストエリアに表示する金額
      //date[] から取り出す
      this.finalPrice = data;
    },

  },
};
</script>


<style>
.horizon2 {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>
