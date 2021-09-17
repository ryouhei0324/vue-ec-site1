<template>
  <div>
    <div>
      <button @click="backPage()">戻る</button>
    </div>

    <h2>
      商品詳細ページ
    </h2>

    <div>
      <div>商品画像 : {{item.img}}</div>
      <div>商品名 : {{item.pizzaName}}</div>
      <div>商品の説明 : {{item.topping}}</div>
      <div>お値段: {{item.price}} 円</div>
    </div>

    <hr width="500"	size="10" noshade="">

    <div>
      サイズを選ぶ
      <span><input type="radio" name="size" id="Msize">&nbsp;<label for="Msize">Mサイズ</label></span>
      <span><input type="radio" name="size" id="Lsize">&nbsp;<label for="Lsize">Lサイズ</label></span>
    </div>

    <div>
      <div>
      トッピングを選択
      </div>
      <span class="container" v-for="item in topping" :value="topping" :key="item.id" :id="topping.name">
        <input type="checkbox"><label :for="topping.name">&nbsp;{{item}}</label>
      </span>
    </div>

    <div>
      <div>
        何個買うのか
        <span>
          <select>
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
      <div>合計 (税抜き) : 円</div>
      <div>消費税 : 円</div>
      <div>合計金額 : 円</div>
    </div>

    <div>
      <button @click="cartPage">カートに入れます！</button>
    </div>

  </div>

</template>

<script>

export default {
  data () {
    return {
      item: {
      img:'画像がくるよ',
      pizzaName : 'まるげ',
      topping : 'ちーずたっぷり、バジル乗ってる',
      price: 1000,
      },

      topping: [
        'ちーず',
        'トマト',
        'えび',
      ]
    };
  },

  methods: {

    backPage() {
      this.$router.push({ name:"Search" },()=>{})
    },
    cartPage() {
      this.$router.push({ name:"Home" },()=>{})
    },
  }
}


</script>
