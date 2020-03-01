<template>
  <div>
    <mt-header class="header">
      <i
        style="margin-top:0rem;color:red;font-size:1.5rem;font-weight:900;"
        class="mintui mintui-back"
        @click="back"
        slot="left"
      ></i>
      <!--  <img
        slot="right"
        src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"
        alt
        style="width:4rem;height:4rem;margin-right:9rem;margin-top:3.5rem;"
      />-->
    </mt-header>
    <div class="buyiyang">
      <img
        src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"
        alt
        style="width:4rem;height:4rem;margin-top:-3.5rem;"
      />
    </div>
    <nav class="nav">
      <div class="shop_name">
        <h4>粥品香坊 (回龙观)</h4>
        <div class="jianjie">
          <span>评价4.2</span>
          <span>月售90单</span>
          <span>蜂鸟快送约24分钟</span>
        </div>
      </div>
      <div class="man_gong">
        <div class="manjian">
          <span>满减</span>
          <span>满36减21,</span>
          <span>满50减26,</span>
          <span>满80减44</span>
        </div>
        <div class="gonggao">
          <span>公告:专注汉堡品牌,华莱士简单有滋味,本店位于: ...</span>
        </div>
      </div>
    </nav>
    <div class="tabContainer">
      <div class="tabItem" v-for="(item,index) in tabItemArr" :key="index" @click="tabClick(index)">
        <span :class="tabItemIndex==index?'blue':''">{{item}}</span>
      </div>
    </div>
    <keep-alive>
      <router-view :tabItemIndex.sync="tabItemIndex"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabItemArr: ["点餐", "评价", "商家"],
      tabItemIndex: 0
    };
  },
  methods: {
    tabClick(i) {
      this.tabItemIndex = i;
      if (i == 0) {
        this.$router.push("/shopDetail");
      } else if (i == 2) {
        this.$router.push("/shopDetail/orderShop");
      } else {
        this.$router.push("/shopDetail/orderRang");
      }
    },
    back(){
      this.$router.newback=true
      this.$router.push('/')
    }
  },
  activated() {
    this.$router.newback=true
    // this.tabItemIndex = 0;
  }
};
</script>

<style>
.header {
  height: 6.4rem;
  background: url("https://easytuan.gitee.io/node-elm-api/public/cb8i9-ocarf.png")
    no-repeat 0 0/100% 100%;
}

.nav .shop_name {
  text-align: center;
}
.shop_name h4 {
  font-size: 1.3rem;
}
.jianjie {
  font-size: 0.7rem;
  color: #666;
}
.man_gong {
  padding-left: 3rem;
  margin: 0.2rem 0;
  font-size: 0.75rem;
}
.manjian > span {
  margin-right: 0.2rem;
}
.manjian > span:nth-child(1) {
  background-color: rgb(240, 115, 115);
  color: white;
  padding: 0.1rem 0.3rem;
  transform: scale(0.8);
}
.gonggao {
  color: #666;
}
.tabContainer {
  display: flex;
}
.tabItem {
  flex: 1;
  text-align: center;
}
.tabItem span {
  padding: 0.3rem 0;
}
.blue {
  border-bottom: 2px solid #2395ff;
}
.buyiyang {
  position: relative;
  text-align: center;
}
</style>