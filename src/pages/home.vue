<template>
  <div>
    <mt-header fixed title="首页" style="font-size:1.3rem;height:3rem;">
      <i class="mintui mintui-search" @click="$router.push('/search')" slot="right"></i>
    </mt-header>
    <nav>
      <div
        class="item"
        v-for="(it,index) in navList"
        :key="index"
        @click="$router.push({name:'shop',params:{title:it.text}})"
      >
        <img :src="imgUrl+it.imgUrl" alt />
        <span style="display:block;">{{it.text}}</span>
      </div>
    </nav>
    <div class="show_list">
      <div class="show1">
        <img src="https://easytuan.gitee.io/node-elm-api/public/show1.png" alt />
      </div>
      <div class="show2">
        <img src="https://easytuan.gitee.io/node-elm-api/public/show2.png" alt />
      </div>
    </div>

    <div class="swiper">
      <mt-swipe :auto="1500">
        <mt-swipe-item>
          <img
            src="https://easytuan.gitee.io/node-elm-api/public/banner/4a6f8262a2a006c0bd6ba31b137c4jpeg.png"
            alt
          />
        </mt-swipe-item>
        <mt-swipe-item>
          <img
            src="https://easytuan.gitee.io/node-elm-api/public/banner/146be328e7121c456ac67f54b59fbjpeg.png"
            alt
          />
        </mt-swipe-item>
        <mt-swipe-item>
          <img
            src="https://easytuan.gitee.io/node-elm-api/public/banner/b28f567a846a21f01aa39a55d6facjpeg.png"
            alt
          />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="shop-tui">—— 推荐商家 ——</div>
    <div class="shop_list">
      <div
        class="shop"
        v-for="(item,index) in shopList"
        :key="index"
        @click="$router.push('/shopDetail')"
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
    <div class="dibu">没有更多了......</div>
  </div>
</template>

<script>
  import { ACTIVE } from "@/api/const";
import star from "@/components/star";
import { getHomeData, getRestaurants } from "@/api/getData.js";
import { ImgUrl } from "@/api/imgUrl.js";
export default {
  props:['selected'],
  components: { star },
  data() {
    return {
      navList: [],
      imgUrl: "",
      shopList: []
    };
  },
  methods: {
    init() {
      this.imgUrl = ImgUrl;
      getHomeData().then(data => {
        if (data.data.code == 0) {
          this.navList = data.data.data;
          //   console.log(this.navList);
        }
      });
      getRestaurants().then(data => {
        if (data.data.code == 0) {
          this.shopList = data.data.data;
        }
      });
    }
  },
  mounted() {
    this.init();
  },
  activated() {
        this.$emit('update:selected','首页')
             sessionStorage.setItem(ACTIVE, '首页');
  }
};
</script>

<style>
.mintui {
  font-size: 1.2rem;
}
nav {
  margin-top: 3rem;
  overflow: hidden;
}
.item {
  width: 20%;
  height: 80px;
  float: left;
  /* background-color: hotpink; */
  text-align: center;
  font-size: 0.6rem;
  color: #666;
}
.item img {
  width: 70%;
  height: 65%;
  vertical-align: top;
}
.show_list {
  overflow: hidden;
}
.show_list div {
  float: left;
  width: 48%;
  padding: 1%;
  /* background-color: hotpink; */
}
.show_list div img {
  width: 100%;
}
.swiper {
  /* height: 200px; */
  height: 6rem;
  padding: 0 0.3rem;
}
.swiper img {
  max-width: 100%;
}

.mint-swipe-indicators .mint-swipe-indicator {
  background-color: #aaa;
  opacity: 1;
}
.mint-swipe-indicators .is-active {
  background-color: cyan;
  opacity: 1;
}
.shop-tui {
  text-align: center;
  margin: 0.5rem;
  font-size: 0.9rem;
}
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
.dibu {
  text-align: center;
  color: turquoise;
  font-weight: 900;
}
</style>
