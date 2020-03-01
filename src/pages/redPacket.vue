<template>
  <div>
          <mt-header fixed title="红包" style="font-size:1.1rem;height:3rem;">
            <i class="mintui mintui-back" @click="$router.back()" slot="left"></i>
          </mt-header>
          <div id="packet-body">
            <div class="packet-img">
              <img src="https://easytuan.gitee.io/node-elm-api/public/benefit.gif" alt="">
            </div>
            <div class="packet-text">
                <p>没有红包</p>
                <p>快去抢几个吧</p>
            </div>
          </div>
  </div>
</template>

<script>
  export default {
        activated() {
          this.$router.newback=true
        }
  }
</script>

<style>
  #packet-body{
    margin-top: 3rem;
    height: calc(100vh - 3rem);
    background-color: #f5f5f5;
  }
  .packet-img{
    text-align: center;
  }
.packet-img img{
  width: 75%;
}
.packet-text{
  text-align: center;
}
.packet-text p:nth-child(1){
  color: #6a6a6a;
  margin-bottom: 0.5rem;
}
.packet-text p:nth-child(2){
  color: #999;
  font-size: 0.7rem;
}

</style>
