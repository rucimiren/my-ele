<template>
  <div id="orderShop">
    <div class="img_shop">
      <img src="https://easytuan.gitee.io/node-elm-api/public/cb8i9-ocarf.png" alt />
    </div>
    <div class="nameShop">{{list.name}}</div>
    <div class="infos" v-if="list.infos">
      <div class="fapiao">发票:{{list.infos[0]}}</div>
      <div class="pinlei">{{list.infos[1]}}</div>
      <div class="loca">地址: {{list.infos[2]}}</div>
      <div class="时间">{{list.infos[3]}}</div>
    </div>
    <div class="jieshaoShop">{{list.bulletin}}</div>
    <div class="gushi">
      <a href="https://h5.ele.me/brandstory/?restaurant_id=161360353">查看品牌故事</a>
    </div>
    <p class="peisong">配送信息</p>
    <p class="kuaidi">由蜂鸟快送提供配送，约24分钟送达，距离2.1km</p>
    <p class="fee">配送费￥4</p>
  </div>
</template>

<script>
import { getSeller } from "@/api/getData";
export default {
  props: ["tabItemIndex"],
  data() {
    return {
      list: []
    };
  },
  methods: {
    init() {
      this.$emit("update:tabItemIndex", 2);
      getSeller().then(data => {
        // console.log(data.data.data);
        if (data.data.code == 0) {
          this.list = data.data.data;
        }
      });
    }
  },
  activated() {
    this.init();
  }
};
</script>

<style>
#orderShop {
  padding: 1rem;
}
.img_shop img {
  width: 100%;
}
.nameShop {
  height: 2rem;
  line-height: 2rem;
  color: #000;
  font-weight: 900;
}
.jieshaoShop {
  margin-top: 0.6rem;
  font-size: 0.8rem;
  color: #666;
}
.gushi {
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}
.gushi a {
  color: #666;
  font-size: 0.9rem;
  text-decoration: none;
}
.infos {
  font-size: 0.8rem;
  color: #00a0dc;
}
.infos div {
  margin-bottom: 0.3rem;
}
p.peisong {
  font-weight: 900;
  height: 3rem;
  line-height: 3rem;
}
p.kuaidi,
p.fee {
  font-size: 0.8rem;
  color: #666;
}
</style>