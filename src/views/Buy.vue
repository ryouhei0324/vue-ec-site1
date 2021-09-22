<template>
    <div>

        <h3>商品確認画面</h3>

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
                    <td>商品名</td>
                    <td>画像</td>
                    <td>サイズ</td>
                    <td>数量</td>
                    <td>トッピング</td>
                    <td>価格 (税抜き)</td>
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
									<div>お名前<span className="must" /></div>
									<div>
										<input className="input" type="text" value={userName} onChange={inputUserName} placeholder="カレー太郎" />
									</div>
								</td>
							</tr>


							<tr>
								<td>
									<div>メールアドレス<span className="must" /></div>
									<div>
										<input className="input" type="text" value={mailAddress} onChange={inputMailAddress} placeholder="curry@xxxx.com" />
									</div>
								</td>
							</tr>


							<tr>
								<td>
									<div>郵便番号<span className="must" /></div>
									<div>
										<input className="input" type="text" value={addressNumber} onChange={inputAddressNumber} placeholder="160-0022" />
									</div>
								</td>
							</tr>

							<tr>
								<td>
									<div>住所<span className="must" /></div>
									<div>
										<input className="input" type="text" value={address} onChange={inputAddress} placeholder="東京都新宿区新宿4-3-23 TOKYU REIT  新宿ビル8F" />
									</div>
								</td>
							</tr>


							<tr>
								<td>
									<div>電話番号<span className="must" /></div>
									<div>
										<input className="input" type="text" value={phoneNumber} onChange={inputPhoneNumber} placeholder="000-0000-0000" />
									</div>
								</td>
							</tr>


							<tr>
								<td>
									<div>配達日時<span className="must" /></div>
									<div>
										<input className="input" type="date" value={deliveryDate} onChange={inputDeliveryDate} />
									</div>
									<div className="time">
										<div className="time-item"><input type="radio" name="time" value="10" onChange={inputDeliveryTime} id="r10" /><label htmlFor="r10">&nbsp;10時</label></div>
										<div className="time-item"><input type="radio" name="time" value="11" onChange={inputDeliveryTime} id="r11" /><label htmlFor="r11">&nbsp;11時</label></div>
										<div className="time-item"><input type="radio" name="time" value="12" onChange={inputDeliveryTime} id="r12" /><label htmlFor="r12">&nbsp;12時</label></div>
										<div className="spacer"></div>
										<div className="time-item"><input type="radio" name="time" value="13" onChange={inputDeliveryTime} id="r13" /><label htmlFor="r13">&nbsp;13時</label></div>
										<div className="time-item"><input type="radio" name="time" value="14" onChange={inputDeliveryTime} id="r14" /><label htmlFor="r14">&nbsp;14時</label></div>
										<div className="time-item"><input type="radio" name="time" value="15" onChange={inputDeliveryTime} id="r15" /><label htmlFor="r15">&nbsp;15時</label></div>
										<div className="spacer"></div>
										<div className="time-item"><input type="radio" name="time" value="16" onChange={inputDeliveryTime} id="r16" /><label htmlFor="r16">&nbsp;16時</label></div>
										<div className="time-item"><input type="radio" name="time" value="17" onChange={inputDeliveryTime} id="r17" /><label htmlFor="r17">&nbsp;17時</label></div>
										<div className="time-item"><input type="radio" name="time" value="18" onChange={inputDeliveryTime} id="r18" /><label htmlFor="r18">&nbsp;18時</label></div>
									</div>
								</td>
							</tr>

						</tbody>
					</table>
        </div>


        <div>お支払い方法</div>

				<div>
					<table>
						<tbody>

							<tr>
								<td>
									お支払い方法を選択してください。<span className="must" />
								</td>
							</tr>
							<tr>
								<td>
									<input type="radio" name="pay" value="1" onChange={inputStatus} id="cashOnDelivery" /><label htmlFor="cashOnDelivery">代金引換</label>
								</td>
							</tr>
							<tr>
								<td>
									<input type="radio" name="pay" value="2" onChange={inputStatus} id="credit" /><label htmlFor="credit">クレジットカード決済</label>
								</td>
							</tr>

						</tbody>
					</table>
				</div>
        

        <div>
            <button @click="order">注文</button>
        </div>




    </div>
</template>

<script>

export default {

    data(){

    },

    methods: {
        order() {
            this.$router.push({ name: "OrderFinish" }, () => {});
        }
    }
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