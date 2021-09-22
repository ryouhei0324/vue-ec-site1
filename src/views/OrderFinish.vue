<template>
  <div>
    <div>

      <div class='message-title'>Thank You</div>
                    <div class='icon-line'>
                        <img src="../assets/img2/mugi.png" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="../assets/img2/tomato.png" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="../assets/img2/cheese.png" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="../assets/img2/meat.png" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="../assets/img2/pizza.png" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="../assets/img2/kok.png" />&nbsp;&nbsp;&nbsp;&nbsp;
                        
                    </div>

      <div>
        <h2>ラクラクカリーをご利用頂きましてありがとうございます。</h2>
        <h3>決済は正常に完了しました。</h3>
      </div>
    </div>

    <div>
      <button @click="backHome">戻る</button>
    </div>


    <div>
        <img class="town-line" src="../assets/img2/town.png" />&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  </div>
</template>

<script>
export default {
  data() {},

  methods: {
    backHome() {
      this.$router.push({ name: "Search" }, () => {});
    },
  },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Allison&family=Dawning+of+a+New+Day&family=Luckiest+Guy&family=Orbitron:wght@700&family=Ranchers&family=Sawarabi+Gothic&display=swap');


.container {
    display: flex;
    /* padding: 0.2em 0.5em; */
    margin-left: 10%;
    margin-right: 10%;
    /* box-shadow: 0px 0px 0px 5px #fff5d6;
    border-radius: 10px; */

}

.message-title {
    color: #684534;
    text-shadow: #a8b3be;
    font-size: 300%;
    text-align: center;
    font-family: 'Ranchers', cursive;
    margin-top: 5%;
    padding-top: 4%;
    padding-bottom: 2%;
    /* background: #fff5d6;
    box-shadow: 0px 0px 0px 5px #fff5d6;
    border: dashed 2px white;
    border-radius: 10px; */
}

.icon-line {
    text-align: center;

}

.message {
    margin-top: 5%;
    text-align: center;
}

.button-position {
    text-align: center;
}

.button {
    width: 12%;
    height: 40px;
    margin-top: 5%;
    margin-bottom: 5%;
    background: transparent;
    border: none; 
    border-radius: 5px;
    color: rgb(59, 55, 50);
    font-size:14px;
    text-align: center;
    cursor: pointer;
}

.button:hover {
    background-color: #ada49f;
    color: white;
}

.town-line {

    width: 100%;

}

.order-button {
    margin-top: 5%;
    margin-bottom: 5%;
    border: none; 
    text-align: right;
    margin-top: 3%;
    margin-right: 10%;
    margin-bottom: 5%;
    cursor: pointer;
}
</style>