<template>
  <div class="shop_list">
    <div
      class="shop"
      v-for="(item,index) in shopList"
      :key="index"
      @click="go"
      ref="list"
    >
      <div class="shop_img">
        <img :src="imgUrl+item.image_path" alt />
      </div>

      <div class="shop_detail">
        <div class="title">
          <span>
            <strong>品牌</strong>
          </span>
          <span>
            <strong>{{item.name}}</strong>
          </span>
          <div class="right baozhunpiao">
            <span
              style="padding:0 0.1rem;"
              v-for="(item1,index1) in item.supports"
              :key="index1"
            >{{item1.icon_name}}</span>
          </div>
        </div>
        <div class="rang">
          <span class="xing">
            <star :rang="item.rating"></star>
          </span>
          <span style="color:red; margin-left:-0.1rem;">{{item.rating}}</span>
          <span class="yueshou" style=" margin-left:-0.4rem;">月售{{item.recent_order_num}}单</span>
          <div class="right">
            <span class="fengniao" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
            <template>
              <div
                style="display:inline-block;"
                v-for="(item2,index2) in item.supports"
                :key="index2"
              >
                <span class="zhunshi" v-if="item2.icon_name=='准'">准时达</span>
              </div>
            </template>
          </div>
        </div>
        <div class="pei_song">
          <span class="qisong">¥20起送</span>
          <span class="gang">/</span>
          <span class="peisong">{{item.piecewise_agent_fee.tips}}</span>
          <div class="right">
            <span>{{item.distance}}</span>
            <span>/</span>
            <span class="timer">{{item.order_lead_time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImgUrl } from "@/api/imgUrl.js";
import star from "@/components/star";
export default {
  components: { star },
  props: ["shopList"],
  data() {
    return {
      imgUrl: ""
    };
  },
  methods: {
    init() {
      this.imgUrl = ImgUrl;
    },
    show() {
      if (this.$refs.list) {
        //   console.log(this.$refs.list[this.$refs.list.length - 1]);
        let ele = this.$refs.list[this.$refs.list.length - 1];
        //   console.log(ele.offsetTop);
        return ele.offsetTop + ele.offsetHeight / 2;
      }
    },
    go(){
      this.$router.newback=false;
      this.$router.push('/shopDetail')
    }
  },
  activated() {
    this.init();
  }
};
</script>

<style>
.shop {
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  margin-bottom: 0.8rem;
}
.shop > div {
  float: left;
  height: 6rem;
}
.shop .shop_img {
  width: 18%;
  padding-left: 2%;

  /* background-color: hotpink; */
}
.shop .shop_detail {
  width: 78%;
  padding-left: 2%;
  /* background: orange; */
  font-size: 0.7rem;
  color: #666;
  display: flex;
  flex-direction: column;
}
.shop_img img {
  width: 100%;
  /* height: 100%; */
}
.shop_detail > div {
  flex: 1;
  overflow: hidden;
  padding-right: 0.3rem;
}
.title strong {
  color: black;
}
.title > span:nth-child(1) {
  background: yellow;
  padding: 0 0.2rem;
}
.title > span:nth-child(2) {
  font-size: 0.9rem;
}

.shop_detail .right {
  float: right;
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
}
.yueshou,
.qisong,
.peisong,
.gang {
  display: inline-block;
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
}
.baozhunpiao {
  margin-top: 0.2rem;
}
.zuo {
  margin-left: -0.5rem;
}
.xing {
  vertical-align: middle;
}
.fengniao {
  background-color: #1070ff;
  color: white;
  border-radius: 0.2rem;
  border: 1px solid #1070ff;
}
.zhunshi {
  border: 1px solid #1070ff;
  color: #1070ff;
  border-radius: 0.2rem;
}
/* .iconwujiaoxing {
  color: #f8ce46;
} */
.timer {
  color: #1070ff;
}
</style>