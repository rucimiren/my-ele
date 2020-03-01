<template>
  <div id="star">
    <div class="hou">
      <i class="iconfont iconwujiaoxing" v-for="item in 5" :key="item"></i>
    </div>
    <div class="qian" :style="{'width':rang/5*4+'rem'}">
      <i class="iconfont iconwujiaoxing yanse" v-for="item in 5" :key="item"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rang"],
  data() {
    return {};
  },
  mounted() {
    // console.log(this.rang);
  }
};
</script>

<style>
#star {
  position: relative;
}

.hou,
.qian {
  display: inline-block;
  /* width: 4rem; */
  /* transform: scale(0.9);
  -webkit-transform: scale(0.9); */
  overflow: hidden;
  white-space: nowrap;
}
.qian {
  position: absolute;
  top: 0;
  left: 0;
}
.iconwujiaoxing {
  margin-left: -0.1rem;
  font-size: 0.9rem;
}
.yanse {
  color: #f8ce46;
}
</style>