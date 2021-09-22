<template>
<div>
    <div>
        <h3>注文完了！</h3>
    </div>


    <div>
        <button @click="backHome">戻る</button>
    </div>
</div>
</template>

<script>

export default  {
    
    data () {
    },


    methods: {
        backHome() {
            this.$router.push({ name: "Search" }, () => {});
        }
    }

}
</script>