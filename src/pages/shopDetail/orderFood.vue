<template>
  <div>
    <div class="foodContent">
      <ul class="food_left">
        <li
          :class="leftIndex==index?'left_dec white':'left_dec'"
          @click="leftClick(index)"
          v-for="(item,index) in foodList"
          :key="index"
        >{{item.name}}</li>
      </ul>
      <div class="food_right" ref="food_right" @scroll="rightScroll">
        <dl ref="dl" class="right_dl" v-for="(item,index) in foodList" :key="index">
          <dt class="right_dt">{{item.name}}</dt>
          <dd class="right_dd" v-for="(itemChild,indexChild) in item.foods" :key="indexChild">
            <div class="dd_img">
              <img :src="itemChild.image" alt />
            </div>
            <div class="dd_detail">
              <div class="detail_item">
                <span class="food_name">{{itemChild.name}}</span>
              </div>
              <div class="detail_item">
                <span>月售{{itemChild.sellCount}}份</span>
                <span>好评率{{itemChild.rating}}%</span>
              </div>
              <div class="detail_item">
                <strong class="strong">¥ {{itemChild.price}}</strong>
                <div class="jiaCount">
                  <span
                    v-if="arr[index].indexOf(indexChild)!=-1&&gwcList[index][arr[index].indexOf(indexChild)].num!=0"
                    class="jian"
                    @click="jian(itemChild.price,indexChild,index)"
                  >-</span>
                  <span
                    v-if="arr[index].indexOf(indexChild)!=-1&&gwcList[index][arr[index].indexOf(indexChild)].num!=0"
                    class="count"
                  >{{gwcList[index][arr[index].indexOf(indexChild)].num}}</span>
                  <span class="jia" @click="jia(itemChild.name,itemChild.price,indexChild,index)">+</span>
                </div>
              </div>
            </div>
          </dd>
        </dl>

        <div class="orderzhan"></div>
      </div>
    </div>
    <footer id="footer" ref="footer">
      <div :class="gwcCount==0?'icon iconhei':'icon iconlan'" @click="gwc_table">
        <i
          :class="gwcCount==0?'iconfont icongouwuche2 tubiaohei':'iconfont icongouwuche2 tubiaobai'"
        ></i>
        <mt-badge
          type="error"
          size="small"
          style="position:absolute;right:-0.5rem;top:-0.5rem;height:0.8rem;line-height:0.8rem"
          v-if="gwcCount!=0"
        >{{gwcCount}}</mt-badge>
      </div>
      <div :class="gwcFee!=0?'price gwcFee_white':'price gwcFee_black'">¥ {{gwcFee}}元</div>
      <div class="pei_fee">另需配送费¥4元</div>
      <div class="qi_song" v-if="gwcFee==0">¥20元起送</div>
      <div class="qi_song" v-else-if="gwcFee>=0&&gwcFee<20">还差¥{{20-gwcFee}}元起送</div>
      <div class="qi_song lv" v-else>去结算</div>

      <div class="footer_table" ref="table">
        <div class="table_head">
          <span>已选商品</span>
          <span>清空</span>
        </div>
        <ul class="table_body" v-for="(itemi,indexi) in gwcList" :key="indexi">
          <template v-for="(item1,index1) in itemi">
            <li v-if="item1.num!=0" :key="index1">
              <div class="table_foodName">{{item1.name}}</div>
              <div class="table_foodCount">
                <span class="shoujia">¥{{item1.price*item1.num}}</span>
                <span class="jian" @click="jian1(item1.price,index1,indexi)">-</span>
                <span class="count">{{item1.num}}</span>
                <span class="jia" @click="jia1(item1.price,index1,indexi)">+</span>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import { getFoods } from "@/api/getData";
export default {
  props: ["tabItemIndex"],
  data() {
    return {
      num: 0,
      time: null,
      timer: null,
      foodList: [],
      leftIndex: 0,
      gwcCount: 0,
      gwcFee: 0,
      boo: true,
      gwcList: [],
      arr: [],
      footerList: []
    };
  },
  methods: {
    init() {
      getFoods().then(data => {
        // console.log(data.data.data);
        this.foodList = data.data.data;
        for (var i = 0; i < this.foodList.length; i++) {
          var arr1 = [];
          var arr2 = [];
          this.arr.push(arr1);
          this.gwcList.push(arr2);
        }
        // console.log(this.gwcList);
      });
    },
    leftClick(i) {
      this.leftIndex = i;
      this.scrollTo(i);
    },
    scrollTo(i) {
      var dlArr = this.$refs.dl;
      var food_right = this.$refs.food_right;
      // console.log(dlArr[i], food_right);
      // food_right.scrollTop = dlArr[i].offsetTop;
      this.animate_my(food_right, dlArr[i].offsetTop);
    },
    animate_my(ele, endy) {
      clearInterval(this.time);
      let step;
      this.time = setInterval(() => {
        step = (endy - ele.scrollTop) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        ele.scrollTop = ele.scrollTop + step;
        // console.log(1);
        if (
          Math.abs(endy - ele.scrollTop) <= Math.abs(step) ||
          ele.scrollHeight - ele.scrollTop <= ele.offsetHeight
        ) {
          // console.log(2);
          clearInterval(this.time);
          ele.scrollTop = endy;
        }
      }, 25);
    },
    rightScroll() {
      var dlArr = this.$refs.dl;
      var food_right = this.$refs.food_right;
      // clearInterval(this.time);
      for (let i = 0; i <= dlArr.length; i++) {
        if (
          dlArr[i].offsetTop + dlArr[i].offsetHeight >=
          food_right.scrollTop
        ) {
          this.leftIndex = i;
          return;
        }
      }
    },
    gwc_table() {
      var table = this.$refs.table;
      // console.log(table);
      var y = table.offsetHeight;
      if (this.boo) {
        table.style.top = -y + "px";
        this.boo = false;
      } else {
        table.style.top = 3 + "rem";
        this.boo = true;
      }
    },
    jian(price, i, a) {
      this.gwcCount--;
      this.gwcList[a][this.arr[a].indexOf(i)].num--;

      if (this.gwcList[a][this.arr[a].indexOf(i)].num <= 0) {
        this.gwcList[a][this.arr[a].indexOf(i)].num = 0;
      }

      var renminbi = price;
      this.gwcFee -= renminbi;
      if (this.gwcFee <= 0) {
        this.gwcFee = 0;
      }

      // if (this.gwcList[a][this.arr[a].indexOf(i)].num == 0) {
      //   this.gwcList[a].splice(this.arr[a].indexOf(i), 1);
      //   this.arr[a].splice(this.arr[a].indexOf(i), 1);
      //   console.log(this.arr, this.gwcList);
      // }
    },
    jia(name, price, i, a) {
      this.gwcCount++;
      // console.log(this.foodList[a].foods);
      if (this.arr[a].indexOf(i) == -1) {
        this.arr[a].push(i);
        var per = {
          name,
          price,
          num: 1
        };
        this.gwcList[a].push(per);
      } else {
        this.gwcList[a][this.arr[a].indexOf(i)].num++;
      }
      var renminbi = price;
      this.gwcFee += renminbi;
      if (this.gwcFee <= 0) {
        this.gwcFee = 0;
      }
    },
    jian1(price, i, a) {
      this.gwcCount--;
      this.gwcList[a][i].num--;
      if (this.gwcList[a][i].num <= 0) {
        this.gwcList[a][i].num = 0;
      }

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        var table = this.$refs.table;
        var y = table.offsetHeight;
        table.style.top = -y + "px";
        // console.log(0);
      }, 0);
      var renminbi = price;
      this.gwcFee -= renminbi;
      if (this.gwcFee <= 0) {
        this.gwcFee = 0;
      }
    },
    jia1(price, i, a) {
      this.gwcCount++;
      this.gwcList[a][i].num++;
      var renminbi = price;
      this.gwcFee += renminbi;
      if (this.gwcFee <= 0) {
        this.gwcFee = 0;
      }
    }
  },
  activated() {
    this.$emit("update:tabItemIndex", 0);
    this.init();
  }
};
</script>

<style>
.foodContent {
  overflow: hidden;
}
.food_left {
  width: 21%;
  height: calc(100vh - 33px);
  float: left;
  background: #f8f8f8;
}
.food_right {
  width: 77%;
  float: left;
  height: calc(100vh - 33px);
  overflow: auto;
  padding-left: 2%;
  position: relative;
}
.left_dec {
  height: 54px;
  box-sizing: border-box;
  font-size: 0.7rem;
  color: #666;
  padding: 1rem 0.7rem 0;
}
.right_dt {
  font-size: 0.7rem;
  color: #666;
}
.right_dd {
  height: 4rem;
  /* background-color: pink; */
  margin: 0.7rem 0;
  overflow: hidden;
}
.dd_img {
  width: 28%;
  height: 100%;
  float: left;
}
.dd_img img {
  width: 100%;
  border-radius: 5px;
}
.dd_detail {
  width: 70%;
  height: 100%;
  float: left;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
}
.detail_item {
  flex: 1;
  font-size: 0.7rem;
  color: #666;
  overflow: hidden;
}
.food_name {
  font-size: 0.8rem;
  color: black;
}
.strong {
  font-size: 0.9rem;
  color: #e4393c;
  float: left;
}
.jiaCount {
  float: right;
  padding-right: 3%;
  height: 100%;
  /* line-height: 100%; */
}
.jia,
.jian {
  width: 18px;
  height: 18px;
  color: white;
  font-size: 1rem;
  font-weight: 900;
  line-height: 18px;
  text-align: center;
  background-color: rgb(35, 149, 255);
  border-radius: 50%;
  /* vertical-align: middle; */
}
.count {
  font-size: 0.9rem;
  font-weight: 900;
}
.white {
  background-color: #fff;
}
.orderzhan {
  height: 3rem;
}
#footer {
  height: 3rem;
  background-color: rgb(61, 61, 63);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
#footer .icon {
  width: 3rem;
  height: 3rem;
  border: 5px solid #555;
  line-height: 3rem;
  text-align: center;
  border-radius: 50%;
  float: left;
  /* margin-left: 0.8rem;
  margin-top: -0.6rem; */
  position: absolute;
  left: 0.8rem;
  top: -0.6rem;
  z-index: 10;

  position: relative;
}
.iconhei {
  background-color: rgb(61, 61, 63);
}
.iconlan {
  background-color: #00a0dc;
}
#footer .icon .icongouwuche2 {
  font-size: 2rem;
}
.tubiaohei {
  color: #80858a;
}
.tubiaobai {
  color: white;
}
.price {
  float: left;
  /* color: #999; */
  font-weight: 900;
  height: 100%;
  line-height: 3rem;
  margin: 0 0.5rem 0 1.5rem;
  border-right: 1px solid #999;
  padding-right: 1rem;
}
.pei_fee {
  float: left;
  color: #999;
  font-weight: 900;
  height: 100%;
  line-height: 3rem;
  margin: 0 0.5rem;
  font-size: 0.7rem;
}
.qi_song {
  float: right;
  color: #fff;
  font-weight: 900;
  height: 100%;
  line-height: 3rem;
  font-size: 0.7rem;
  padding: 0 1rem;
}
.gwcFee_white {
  color: #fff;
}
.gwcFee_black {
  color: #999;
}
.lv {
  background-color: green;
}
.footer_table {
  position: absolute;
  width: 100%;
  max-height: 50vh;
  overflow: auto;
  left: 0;
  top: 3rem;
  background-color: pink;
  transition: all 0.2s linear;
}
.table_head {
  height: 2.5rem;
  line-height: 2.5rem;
  background-color: #f3f5f7;
  border-bottom: 1px solid #ccc;
  font-size: 0.8rem;
  padding: 0 1rem;
}
.table_head span:nth-child(2) {
  float: right;
  color: #00a0dc;
}
.table_body {
  padding: 0 1rem;
  font-size: 0.8rem;
  background-color: #fff;
}
.table_foodName {
  float: left;
}
.table_body li {
  height: 3rem;
  line-height: 3rem;
  border-bottom: 2px solid #ccc;
}
.table_foodCount {
  float: right;
}
.shoujia {
  color: #e4393c;
  font-weight: 900;
  margin-right: 1rem;
  font-size: 0.9rem;
}
</style>