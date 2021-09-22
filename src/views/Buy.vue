<template>
    <div>

        <h3>商品確認画面</h3>

		<div class="memo" v-for="item in $store.state.carts" :key="item.id">
			<div>Name : {{ item.name }}</div>
			<div>email : {{ item.email }}</div>
			<div>addNumber : {{ item.addNumber }}</div>
			<div>address : {{ item.address }}</div>
			<div>tel: {{ item.tel }}</div>
			<div>orderDate : {{ item.orderDate }}</div>
			<div>orderTime : {{ item.orderTime }}</div>
			<div>status : {{ item.status }}</div>
			
		</div>

        <hr class="horizon3" width="500" size="10" noshade="" />

        <div>
            <table>
                <thead>
                <tr>
                    <th>商品名</th>
                    <th>画像</th>
                    <th>サイズ</th>
                    <th>数量</th>
                    <th>トッピング</th>
                    <th>価格 (税抜き)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <!-- <td>{{ getPizzasById(item.pizzaid).name }}</td>
                    <td><img :src="require('../assets/img/' + getPizzasById(item.pizzaid).image)"></td> -->
					<!-- substr(-1) -> priceM or priceL の最後の文字取ってくる ( M or L ) -->
                    <!-- <td>{{item.price.substr(-1)}}</td>
                    <td>{{item.number}}</td>
                    <td>トッピング</td>
                    <td>{{ getPizzasById(item.pizzaid)[item.price] }}</td> -->
                </tr>
                </tbody>
            </table>
        </div>

        <div>消費税 : </div>
        <div>合計金額 : </div>


        <hr class="horizon3" width="500" size="10" noshade="" />


        <h3>お届け先情報</h3>

        <div>

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
										<input class="input" type="text" v-model="humans.address" placeholder="東京都新宿区新宿4-3-23 TOKYU REIT  新宿ビル8F" />
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


        <h3>お支払い方法</h3>

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
									<input type="radio" name="pay" value="1" id="cashOnDelivery" /><label for="cashOnDelivery">代金引換</label>
								</td>
							</tr>
							<tr>
								<td>
									<input type="radio" name="pay" value="2" id="credit" /><label for="credit">クレジットカード決済</label>
								</td>
							</tr>

						</tbody>
					</table>
				</div>


		<div>	
			<ul>
				<li v-for="error in Validation" :key="error">{{ error }}</li>
			</ul>
		</div>	


        <div>
            <button @click="order()">注文</button>
        </div>




    </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex"

export default {

	...mapActions(['addCart']),

	computed:{
	...mapGetters(['getPizzas','getToppings','getCartItems','getPizzasById','getToppingsById','getSelectItem', 'getCarts']),
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
				
		//  today = new Date(
		// 	today.getFullYear(), //年
		// 	today.getMonth(), //月
		// 	today.getDate(), //日
		// 	today.getHours(), //時間
		// )

		// let hopeDate = new Date(this.humans.orderyDate)
		// let nowDay = today.getDate()
		// let date = new Date(hopeDate)

		// hopeDate = new Date(
		// 	today.getMonth(), //月
		// 	today.getDate(), //日
		// )

		// let selectDay = date.getDate() //お届け希望の日付
		// let nowHour = today.getHours() //現在の時間
		// let i = Math.abs(this.humans.orderyTime - nowHour) //お届け希望の時間 - 今の時間

		// //同じ日の処理
		// if (nowDay === selectDay) {
		// 	if (this.humans.orderyTime <= nowHour) {
		// 		return false
		// 	} else if (3 <= i) { //今の時間以降の場合
		// 		return true
		// 	} else {
		// 		return false
		// 	}
		// }


		// //違う日の処理 ( 昨日以前 or 明日以降 )
		// else if (nowDay >= selectDay) {
		// 	return false
		// } else {
		// 	return true
		// }		
		
		
		
		this.Validation = []	  
		if (this.humans.name == "") { 
			this.Validation.push ("名前を入力してください")
		}

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
				
		if(this.Validation.length == 0){
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
}

</style>