<template>
  <v-simple-table>
    <template v-slot:default v-if="!sumPrice==0">
      <thead>
        <tr>
          <th class="text-left">
            商品名
          </th>
            <th class="text-left">
            サイズ
          </th>
          <th class="text-left">
            数量
          </th>
          <th class="text-left">
            トッピング
          </th>
          <th class="text-left">
            小計
          </th>

        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in gP"
          :key="index"
        >
          <td>{{ getPizzasById(item.pizzaid).name }}
         <!-- <img class="pizzaimage" :src="require('../assets/img/' + getPizzasById(item.pizzaid).image)" >							 -->
         </td>
          <td>{{ item.price }}</td>
          <td>{{ item.number }}</td>
            <td>
              <li v-for='top in item.toppingid' :key="top.id">{{getToppingsById(top).name}}</li>
            </td>
          <td>{{ topPrice(index) }}</td>
          <td><button type='submit' @click="deleteItem(index)">削除</button></td>
        </tr>
      </tbody>
        <template v-if="!sumPrice==0" >
            <div>消費税：{{taxP}}円</div>
            <div>ご注文金額合計：{{`${taxP+sumPrice}`}}円(税込)</div>
            <input class="form-control btn btn-warning btn-block" type="submit" value="注文に進む" @click="gotoLink">
        </template>
        <template v-if="sumPrice">
            <h3>商品がありません</h3>
        </template>
    </template>
  </v-simple-table>
  
  
</template>

<script>
import { mapGetters,mapActions } from "vuex"

export default ({

    
    data() {
        return{
            
        }
    },
    computed:{
        ...mapGetters(['getPizzas','getToppings','getPizzasById', 'getToppingsById', 'getCartItems']),

		gP(){	
            console.log(this.getCartItems);		
			if(this.getCartItems.CartItem){return this.getCartItems.CartItem.cartItemList.concat()}	
			else{return []}					
		},
		
        topPrice(){
			return index => {
				let cil = this.getCartItems ? this.getCartItems[index] : {}									
				let total = this.getPizzasById(cil.pizzaid)[cil.price] * 1;				
				for (let i = 0; i < cil.toppingid.length; i++) {                 
					total += this.getToppingsById(cil.toppingid[i])[cil.price] * 1;     					      
				}				
				
				return total * cil.number
			}
		},

		taxP(){
			return this.sumPrice * 0.1
		},

		sumPrice(){
			let cils = this.getCartItems ? this.getCartItems.concat() : []
			let total = 0			

			for (let i = 0; i < cils.length; i++) {
				total += this.getPizzasById(cils[i].pizzaid)[cils[i].price] * cils[i].number;

				for (let j = 0; j < cils[i].toppingid.length; j++) {
					total += this.getToppingsById(cils[i].toppingid[j])[cils[i].price] * cils[i].number;
				}											
			}
			return total
		},


        
    },

    created(){
        // this.pizza.push(this.getCartItems)
        // console.log(this.getCartItems);
    },

    methods:{
    ...mapActions(['setCartItemList','login']),



        deleteItem(index){
            console.log(this.gP);
            this.gP.splice(index,1)
            this.setCartItemList(this.gP)

        },

		gotoLink(){			
			if(this.uid){
				this.$router.push({name:'OrderFinish'})
			}else{				
				alert('ログイン画面に移ります')
				this.login(true)
			}			
		},        


    }
})
</script>

<style>

</style>