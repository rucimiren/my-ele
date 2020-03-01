<template>
  <div>
    <mt-header fixed title="订单" style="font-size:1.1rem;height:3rem;"></mt-header>
    <div class="hidden-img">
      <img src="https://easytuan.gitee.io/node-elm-api/public/nodata.png" alt="">
    </div>
        <template v-if="$store.state.mobile==''">
          <div class="hidden-btn">
            <mt-button class='btn' type="primary" size="large" @click.native='$router.push("/login")'>立即登录</mt-button>
          </div>
        </template>
        <template v-else>
              <div class="show-text">暂无订单信息</div>
        </template>
  </div>
</template>

<script>
  import { ACTIVE } from "@/api/const";
  export default {
    props:['selected'],
      data(){
        return {

        }
      },
      methods:{

      },
      activated() {
        this.$emit('update:selected','订单')
        sessionStorage.setItem(ACTIVE, '订单');
      }
  }
</script>

<style >
.hidden-img{
  text-align: center;
  margin-top: 3rem;
}
.hidden-btn{
  margin-top: 1rem;
  }
  .hidden-btn .btn{
    background-color: #56d176;
  }
  .show-text{
    margin-top:1rem;
     text-align: center;
  }
</style>
