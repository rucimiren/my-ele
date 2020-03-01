<template>
  <div>
        <mt-header fixed title="下载" style="font-size:1.1rem;height:3rem;">
          <i class="mintui mintui-back" @click="back" slot="left"></i>
        </mt-header>
        <div id="downLoad-img">
          <img src="https://easytuan.gitee.io/node-elm-api/public/startup.png" alt="">
        </div>
  </div>
</template>

<script>
  export default {
          methods:{
            back(){
              this.$router.back()
            }
          },
          activated() {
            this.$router.newback=true
          }
  }
</script>

<style >
  #downLoad-img{
    margin-top: 3rem;
    height: calc(100vh - 3rem);
  }
#downLoad-img img{
  width: 100%;
  height: 100%;
}
</style>
