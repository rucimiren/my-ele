<template>
  <div>
    <mt-header fixed :title="title" style="font-size:1.1rem;height:3rem;">
      <i class="mintui mintui-back" @click="back" slot="left"></i>
    </mt-header>
    <div class="zhan"></div>
    <ShopList :shopList="shopList" ref="shop"></ShopList>
    <div class="img">
      <img v-if="imgBoo" src="@/assets/loading3.gif" alt />
      <div v-if="lastTextBoo" class="lastText">没有更多了...</div>
    </div>
  </div>
</template>

<script>
import { TITLE } from "@/api/const";
import { getRestaurants } from "@/api/getData.js";
import ShopList from "@/components/shopList";
export default {
  components: { ShopList },
  data() {
    return {
      title: "",
      shopList: [],
      lastTextBoo: false,
      imgBoo: false,
      timer: null,
      num: 0
    };
  },
  activated() {
this.$router.newback=true
    if (this.$route.params.title) {
      sessionStorage.setItem(TITLE, this.$route.params.title);
    }

    this.title = sessionStorage.getItem(TITLE);
    this.init();
    window.addEventListener("scroll", this.scrollLast);
  },
  deactivated() {
    window.removeEventListener("scroll", this.scrollLast);
  },
  methods: {
    back(){
      this.$router.newback=true
      this.$router.push('/')
    },
    init() {
      this.num = 0;
      this.lastTextBoo = false;
      getRestaurants().then(data => {
        if (data.data.code == 0) {
          this.shopList = data.data.data;
        }
      });
    },
    scroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var cliY = window.innerHeight || document.documentElement.clientHeight;
      //   console.log(scrollTop, this.$refs.shop.show(), cliY);
      //   console.log(this.$refs.shop.show() <= scrollTop + cliY);
      return this.$refs.shop.show() <= scrollTop + cliY;
    },
    scrollLast() {
      if (this.scroll()) {
        if (this.num >= 3) {
          this.lastTextBoo = true;
          return;
        }
        this.imgBoo = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          console.log(1);
          this.num++;
          let l = this.shopList;
          getRestaurants().then(data => {
            if (data.data.code == 0) {
              this.imgBoo = false;
              this.shopList = data.data.data;
              this.shopList = [...l, ...this.shopList];
            }
          });
        }, 1500);
      }
    }
  }
};
</script>

<style>
.zhan {
  margin-top: 4rem;
  overflow: hidden;
}
.img {
  text-align: center;
}
.img img {
  width: 2rem;
  margin-bottom: 0.5rem;
}
.lastText {
  color: cyan;
  font-weight: 900;
  margin-bottom: 1rem;
}
</style>
