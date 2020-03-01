<template>
  <div id="discover">
    <mt-header fixed title="发现" style="font-size:1.1rem;height:3rem;"></mt-header>
    <div class="dis-zhan"></div>
    <div class="dis-img">
      <img src="https://easytuan.gitee.io/node-elm-api/public/discover/discover1.jpg" alt />
      <img src="https://easytuan.gitee.io/node-elm-api/public/discover/discover2.jpg" alt />
    </div>
  </div>
</template>

<script>
  import { ACTIVE } from "@/api/const";
export default {
  props:['selected'],
  data() {
    return {};
  },
  activated() {
      this.$emit('update:selected','发现')
      sessionStorage.setItem(ACTIVE, '发现');
  }
};
</script>

<style>
.dis-zhan {
  margin-top: 3rem;
  overflow: hidden;
}
.dis-img > img {
  width: 100vw;
  border-bottom: 1px solid #ddd;
}
</style>
