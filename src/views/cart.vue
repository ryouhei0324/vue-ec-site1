<template>
  <v-simple-table>
    <template v-slot:default>
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
          v-for="item in gP"
          :key="item.pizzaid"
        >
          <td>{{ item.pizzaid }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.number }}</td>
          <td>{{ item.toppingid }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    <!-- <template>
        <div>消費税：{{tax()}}円</div>
        <div>ご注文金額合計：{{total()}}円(税込)</div>
        <button @click="checkOrLogin()" class='btnDig'>注文に進む</button> 
    </template> -->
    </template>
  </v-simple-table>
  
</template>

<script>
import { mapGetters, } from "vuex"

export default ({

    
    data() {
        return{
            
        }
    },
    computed:{
        ...mapGetters(['getPizzas','getToppings','getPizzasById', 'getToppingsById', 'getCartItems']),

        gP(){			
		if(this.getCartItems){
            console.log(this.getCartItems);
            return this.getCartItems.concat()}	
		else{return []}					
		},
    },

    created(){
        // this.pizza.push(this.getCartItems)
        // console.log(this.getCartItems);
    },

    methods:{
        tax(){
            let total=[]
            this.pizza[0].cartlist.forEach(element => {
                total.push(element*0.1)
                
            });
            let totalTax =total.reduce((sum,element)=>{
                return sum + element;
            },0)

            return totalTax
        },
        total(){
            let total=[]
            this.pizza[0].cartlist.forEach(element => {
                total.push(element.total*1.1)
            });
            let totals =total.reduce((sum,element)=>{
                return sum + element;
            },0)
            return Math.floor(totals)
        }
    }
})
</script>

<style>

</style>