<template>
    <div>

        <h3>商品確認画面</h3>

        <hr class="horizon3" width="500" size="10" noshade="" />

        <div class="box1-framework">
            <table class="box1">
                <thead>
                <tr>
                    <th class="box1-title">商品名</th>
                    <th class="box1-title">画像</th>
                    <th class="box1-title">サイズ</th>
                    <th class="box1-title">数量</th>
                    <th class="box1-title">トッピング</th>
                    <th class="box1-title">価格 (税抜き)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in gP" :key="item.pizzaid">
                    <!-- <td>{{ getPizzasById(item.pizzaid).name }}</td>
                    <td><img :src="require('../assets/img/' + getPizzasById(item.pizzaid).image)"></td> -->
					<!-- substr(-1) -> priceM or priceL の最後の文字取ってくる ( M or L ) -->
                    <!-- <td>{{item.price.substr(-1)}}</td>
                    <td>{{item.number}}</td>
                    <td>トッピング</td>
                    <td>{{ getPizzasById(item.pizzaid)[item.price] }}</td> -->
					<td>{{ getPizzasById (item.pizzaid).name }}</td>
					<td><img :src="require('../assets/img/' + getPizzasById (item.pizzaid).image)"></td>
					<td>{{ item.price.substr(-1) }}</td>
					<td>{{ item.number }}</td>
					<td><div v-for="(tid,i) in item.toppingid" :key="tid + i">{{getToppingsById(tid).name}}</div></td>
					<td>totalPrice</td>
                </tr>
                </tbody>
            </table>
        </div>

        <div>消費税 : tax </div>
        <div>合計金額 : tax + totalPrice </div>


        <hr class="horizon3" width="500" size="10" noshade="" />


        <div class="box1">
			<div class="box1-title">お届け先情報</div>

			<div class="form">
					<table>
						<tbody>
							<tr>
								<td>
									<div>お名前<span class="must" /></div>
									<div>
										<input class="input" type="text" v-model="humans.name" placeholder="ピザ太郎" />
									</div>
								</td>
							</tr>


							<tr>
								<td>
									<div>メールアドレス<span class="must" /></div>
									<div>
										<input class="input" type="text" v-model="humans.email" placeholder="pizza@xxxx.com" />
									</div>
								</td>
							</tr>


							<tr>
								<td>
									<div>郵便番号<span class="must" /></div>
									<div>
										<input class="input" type="text" v-model="humans.addNumber" placeholder="160-0022" />
									</div>
								</td>
							</tr>

							<tr>
								<td>
									<div>住所<span class="must" /></div>
									<div>
										<input class="input" type="text" v-model="humans.address" placeholder="東京都新宿区新宿4-3-23" />
									</div>
								</td>
							</tr>


							<tr>
								<td>
									<div>電話番号<span class="must" /></div>
									<div>
										<input class="input" type="text" v-model="humans.tel" placeholder="000-0000-0000" />
									</div>
								</td>
							</tr>


							<tr>
								<td>
									<div>配達日時<span class="must" /></div>
									<div>
										<input class="input" type="date" v-model="humans.orderDate" />
									</div>
									<div class="time">
										<span class="time-item"><input type="radio" name="time" value="10" v-model="humans.orderTime" id="r10" /><label for="r10">&nbsp;10時</label></span>&nbsp;
										<span class="time-item"><input type="radio" name="time" value="11" v-model="humans.orderTime" id="r11" /><label for="r11">&nbsp;11時</label></span>&nbsp;
										<span class="time-item"><input type="radio" name="time" value="12" v-model="humans.orderTime" id="r12" /><label for="r12">&nbsp;12時</label></span>
										<div class="spacer"></div>
										<span class="time-item"><input type="radio" name="time" value="13" v-model="humans.orderTime" id="r13" /><label for="r13">&nbsp;13時</label></span>&nbsp;
										<span class="time-item"><input type="radio" name="time" value="14" v-model="humans.orderTime" id="r14" /><label for="r14">&nbsp;14時</label></span>&nbsp;
										<span class="time-item"><input type="radio" name="time" value="15" v-model="humans.orderTime" id="r15" /><label for="r15">&nbsp;15時</label></span>
										<div class="spacer"></div>
										<span class="time-item"><input type="radio" name="time" value="16" v-model="humans.orderTime" id="r16" /><label for="r16">&nbsp;16時</label></span>&nbsp;
										<span class="time-item"><input type="radio" name="time" value="17" v-model="humans.orderTime" id="r17" /><label for="r17">&nbsp;17時</label></span>&nbsp;
										<span class="time-item"><input type="radio" name="time" value="18" v-model="humans.orderTime" id="r18" /><label for="r18">&nbsp;18時</label></span>
									</div>
								</td>
							</tr>

						</tbody>
					</table>
				</div>
        </div>


        <div class="box1">
			<div class="box1-title">お支払い情報</div>

				<div>
					<table>
						<tbody>

							<tr>
								<td>
									お支払い方法を選択してください。<span class="must" />
								</td>
							</tr>
							<tr>
								<td>
									<input type="radio" name="pay" value="1" id="cashOnDelivery" /><label for="cashOnDelivery">&nbsp;代金引換</label>
								</td>
							</tr>
							<tr>
								<td>
									<input type="radio" name="pay" value="2" id="credit" /><label for="credit">&nbsp;クレジットカード決済</label>
								</td>
							</tr>

						</tbody>
					</table>
				</div>
		</div>


		<div>	
			<ul>
				<li v-for="error in Validation" :key="error">{{ error }}</li>
			</ul>
		</div>	


        <div>
            <button class="order" @click="order">注文</button>
        </div>




    </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex"

export default {


	computed:{
	...mapGetters(['getPizzas','getToppings','getCartItems','getPizzasById','getToppingsById','getSelectItem', 'getCartItems', 'getCarts']),

	gP(){			
		if(this.getCartItems){
            console.log(this.getCartItems);
            return this.getCartItems.concat()}	
		else { return [] }					
		},

	topPrice(){
			return index => {
				let cil = this.getCartItems[index]									
				let total = this.getPizzasById(cil.pizzaid)[cil.price] * 1;				
				for (let i = 0; i < cil.toppingid.length; i++) {                 
					total += this.getToppingsById(cil.toppingid[i])[cil.price] * 1;     					      
				}				
				
				return total * cil.number
			}
	},

	tax(){
			return this.sumPrice * 0.1
	},

	totalPrice(){
			let cils = this.getCartItems.concat()
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


    data(){
		return {
			humans: {
				name:'',
				email:'',
				addNumber:'',
				address:'',
				tel:'',
				orderDate:'',
				orderTime:'',
				status:'',
			},

			Validation:[],
		}
    },


    methods: {


		...mapActions(['addCart']),
		
        order() {

			//バリデーション
		const attmark = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/); 
		const yuubin = new RegExp(/^\d{3}-\d{4}$/);
		const denwa = new RegExp(/^0\d{1,4}-\d{1,4}-\d{3,4}$/);

		let dt = new Date();
		let hours = dt.getHours();

		let dateDiff = new Date(this.humans.orderDate).getDate() - dt.getDate();				
		let time = this.humans.orderTime - hours;						
		let radios = document.getElementsByName("pay");		
		for(var i=0; i<radios.length; i++){
			if (radios[i].checked) {
				this.humans.status =  radios[i].value;	
		
		

		this.Validation = []	  
		// if (this.humans.name == "") { 
		// 	this.Validation.push ("名前を入力してください")
		// }

		if (this.humans.email == "") {
			this.Validation.push ("アドレスを入力してください")
		} else if (!attmark.test(this.humans.email) ) {
			this.Validation.push("メールアドレスの形式が不正です")
		}

		if ( this.humans.addNumber == "" ) {
			this.Validation.push("郵便番号を入力してください")
		} else if ( !yuubin.test(this.humans.addNumber) ) {
			this.Validation.push("郵便番号はXXX-XXXXの形式で入力してください")
		}

		if ( this.humans.address == "" ) {
			this.Validation.push("住所を入力してください")
		}

		if ( this.humans.tel == "" ) {
			this.Validation.push("電話番号を入力してください")
		} else if ( !denwa.test(this.humans.tel) ) {
			this.Validation.push ( "電話番号はXXXX-XXXX-XXXXの形式で入力してください" )
		}

		if ( this.humans.orderDate == "" ) {
			this.Validation.push("配送日を入力してください" )
		}

		if ( this.humans.orderTime == 0 ) {
			this.Validation.push("配送時間を入力してください" )
		}

		if ( time  <= 3 && dateDiff < 1 ) {
			this.Validation.push("今から3時間後の日時をご入力ください")
		}

		if ( this.humans.status == 0 ) {
			this.Validation.push ("支払い方法を選択してください")
		}		
				
		if(this.Validation.length == 0) {
			console.log('aaa');
			console.log(this.humans);		
			this.addCart(this.humans)
			console.log('ccc');
			this.$router.push({ name: "OrderFinish" }, () => {});
		}
		console.log(this.$store.state.carts);
		console.log('bbb');	
		}
	}
		}
		
	},
}

</script>



<style>
.horizon3 {
	width: 90%;
    margin-top: 5%;
    margin-bottom: 5%;
    margin-left: auto;
    margin-right: auto;
	margin-top: 5%;
	margin-bottom: 5%;
}

.form {
	text-align: center;
	margin-left: 10%;
	margin-top: 5%;
}
.box1 {
    margin: 2em 0;
    background: #dcefff;
	margin-left: auto;
	margin-right: auto;
	width: 70%;
	margin-top: 5%;
	margin-bottom: 10%;
	padding-bottom: 3%;
}
.box1-title {
    font-size: 1.2em;
    background: #5fb3f5;
    padding: 4px;
    text-align: center;
    color: #FFF;
    font-weight: bold;
    letter-spacing: 0.05em;
}

.must::after {
    content: "必須";
    background-color: #f0564e;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    min-width: 10px;
    padding: 3px 7px;
    margin: 0px 5px;
    line-height: 1;
    vertical-align: middle;
    white-space: nowrap;
    text-align: center;
    border-radius: 10px;
    display: inline-block;
}

.input {
	width: 120%;
    border: none; 
	/* margin-top: 5%; */
    margin-bottom: 5%;
	background-color: #FFF;
}

.input:hover {
    border: 1px solid #0094ff;
}

/* .time {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.time-item {
    margin-bottom: 1%;
    margin-right: 2%;
} */


.order {
    width: 10%;
    height: 40px;
    margin-bottom: 5%;
    background: transparent;
    border: none; 
    border-radius: 5px;
    color: rgb(59, 55, 50);
    font-size:14px;
    text-align: center;
    cursor: pointer;
	margin-top: 3%;
	margin-bottom: 10%;
}

.order:hover {
    background-color: #ada49f;
    color: white;
}

</style>