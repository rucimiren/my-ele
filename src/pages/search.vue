<template>
  <div id="search">
    <mt-header fixed title="搜索" style="font-size:1.1rem;height:3rem;">
      <i class="mintui mintui-back" @click="back" slot="left"></i>
    </mt-header>
    <div class="zhan"></div>
    <mt-search :result.sync="result" v-model="value" cancel-text="取消" placeholder="搜索"></mt-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      result: ["你好", "不好", "真不好", "是啊"]
    };
  },
  methods:{
    back(){
      this.$router.newback=true;
      this.$router.push('/')
    }
  },
  activated() {
    this.$router.newback=true;
  }
};
</script>

<style>
#search .zhan {
  margin-top: 3.2rem;
  overflow: hidden;
}
#search .mint-search-list-warp {
  margin-top: 3.3rem;
}
#search  .mint-cell {
  background-color: skyblue;
  min-height: 2rem;
}
#search  .mint-cell-title {
  color: blue;
  font-size: 0.9rem;
}
#search  .mint-searchbar {
  padding: 0.2rem 0.2rem;
  border-radius: 8px;
  background-color: skyblue;
}
#search  .mint-searchbar-inner {
  border-radius: 8px;
}
</style>