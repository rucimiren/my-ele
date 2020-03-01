<template>
  <div>
    <keep-alive>
      <router-view :selected.sync='selected'></router-view>
    </keep-alive>
    <div class="zhanwei"></div>
    <mt-tabbar fixed v-model="selected" @click.native="isactive" class="tabbar">
      <mt-tab-item id="首页" @click.native="$router.push('/')">
        <i v-if="selected=='首页'" slot="icon" class="iconfont iconchangyonglogo40"></i>
        <i v-else slot="icon" class="iconfont iconSSS"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="发现" @click.native="$router.push('/discover')">
        <i v-if="selected=='发现'" slot="icon" class="iconfont iconfaxian"></i>
        <i v-else slot="icon" class="iconfont iconfaxian1"></i>
        发现
      </mt-tab-item>
      <mt-tab-item id="订单" @click.native="$router.push('/orderForm')">
        <i v-if="selected=='订单'" slot="icon" class="iconfont iconicon-order-f"></i>
        <i v-else slot="icon" class="iconfont icondingdan" ></i>
        订单
      </mt-tab-item>
      <mt-tab-item id="我的" @click.native="$router.push('/user')">
        <i v-if="selected=='我的'" slot="icon" class="iconfont iconwodedangxuan"></i>
        <i v-else slot="icon" class="iconfont iconwode1"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { ACTIVE } from "@/api/const";
export default {
  data() {
    return {
      selected: "首页"
    };
  },
  methods: {
    isactive() {
      sessionStorage.setItem(ACTIVE, this.selected);
    }
  },
  activated() {
    if (sessionStorage.getItem(ACTIVE)) {
      this.selected = sessionStorage.getItem(ACTIVE);
    }
  }
};
</script>

<style scoped>
.iconfont {
  font-size: 22px;
}
.tabbar {
  color: #666;
}
.zhanwei {
  height: 4rem;
}
</style>
