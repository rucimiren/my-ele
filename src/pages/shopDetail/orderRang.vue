<template>
  <div id="orderRang">
    <ul class="ul_head">
      <li class="one">
        <div class="one-text">4.2</div>
        <div class="one-shoprang">
          <p>商家评分</p>
          <p>
            <star :rang="4.2"></star>
          </p>
        </div>
      </li>
      <li>
        <div class="wei-bao-pei">
          <div>味道</div>
          <div>4.1</div>
        </div>
      </li>
      <li>
        <div class="wei-bao-pei">
          <div>包装</div>
          <div>4.3</div>
        </div>
      </li>
      <li>
        <div class="wei-bao-pei">
          <div>配送</div>
          <div>24</div>
        </div>
      </li>
    </ul>
    <div class="tang-tab">
      <div class="tab-1">
        <span :class="tabIndex==0?'tabQie':''" @click="tabQie(0)">全部 {{ratingList.length}}</span>
        <span :class="tabIndex==1?'tabQie':''" @click="tabQie(1)">满意 {{yesList.length}}</span>
        <span :class="tabIndex==2?'tabQie':''" @click="tabQie(2)">不满意 {{noList.length}}</span>
      </div>
      <div class="tab-2">
        <i
          @click="duigou"
          :class="boo?'iconfont iconduigou duigouhui':'iconfont iconduigou duigoulv'"
        ></i>
        <span>只看有内容的评价</span>
      </div>
    </div>
    <div class="rat-content" v-if="tabIndex==0">
      <template v-for="(item,index) in ratingList">
        <div class="contents" :key="index" v-if="boo?true:item.text!=''">
          <div class="content-left">
            <span></span>
          </div>
          <div class="content-right">
            <div class="right-one">
              <span>{{item.username}}</span>
              <span>
                <dateTime :dateTime="item.rateTime"></dateTime>
              </span>
            </div>
            <div class="right-two">
              <star :rang="item.score"></star>
            </div>
            <div class="right-three">{{item.text}}</div>
            <div class="right-four">
              <span v-for="(item1,index1) in item.recommend" :key="index1">{{item1}}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="rat-content" v-if="tabIndex==1">
      <template v-for="(item,index) in yesList">
        <div class="contents" :key="index" v-if="boo?true:item.text!=''">
          <div class="content-left">
            <span></span>
          </div>
          <div class="content-right">
            <div class="right-one">
              <span>{{item.username}}</span>
              <span>
                <dateTime :dateTime="item.rateTime"></dateTime>
              </span>
            </div>
            <div class="right-two">
              <star :rang="item.score"></star>
            </div>
            <div class="right-three">{{item.text}}</div>
            <div class="right-four">
              <span v-for="(item1,index1) in item.recommend" :key="index1">{{item1}}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="rat-content" v-if="tabIndex==2">
      <template v-for="(item,index) in noList">
        <div class="contents" :key="index" v-if="boo?true:item.text!=''">
          <div class="content-left">
            <span></span>
          </div>
          <div class="content-right">
            <div class="right-one">
              <span>{{item.username}}</span>
              <span>
                <dateTime :dateTime="item.rateTime"></dateTime>
              </span>
            </div>
            <div class="right-two">
              <star :rang="item.score"></star>
            </div>
            <div class="right-three">{{item.text}}</div>
            <div class="right-four">
              <span v-for="(item1,index1) in item.recommend" :key="index1">{{item1}}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import star from "@/components/star";
import dateTime from "@/components/dateTime";
import { getRatings } from "@/api/getData";
export default {
  props: ["tabItemIndex"],
  components: { star, dateTime },
  data() {
    return {
      tabIndex: 0,
      boo: true,
      ratingList: [],
      yesList: [],
      noList: []
    };
  },
  methods: {
    init() {
      this.yesList = [];
      this.noList = [];
      this.$emit("update:tabItemIndex", 1);
      getRatings().then(data => {
        if (data.data.code == 0) {
          this.ratingList = data.data.data;
          for (let i = 0; i < this.ratingList.length; i++) {
            if (this.ratingList[i].rateType == 0) {
              this.yesList.push(this.ratingList[i]);
            } else {
              this.noList.push(this.ratingList[i]);
            }
          }
          // console.log(this.yesList, this.noList);
        }
      });
    },
    tabQie(i) {
      this.tabIndex = i;
    },
    duigou() {
      this.boo = !this.boo;
    }
  },
  activated() {
    this.init();
  }
};
</script>

<style>
.tab-1 span.tabQie {
  background-color: #00a0dc;
  color: white;
}
.duigoulv {
  color: #76d572;
}
.duigouhui {
  color: #e8e8e8;
}
#orderRang {
  height: calc(100vh - 33px);
  overflow: auto;
}
.ul_head {
  margin-top: 0.5rem;
  display: flex;
  height: 5rem;
  padding: 0 1.5rem;
  border-bottom: 0.7rem solid #f5f5f5;
}
.ul_head li {
  flex: 1;
  overflow: hidden;
}
li.one {
  flex: 3;
}
.one-text {
  float: left;
  font-size: 2.5rem;
  color: #e4393c;
  line-height: 5rem;
  margin-right: 0.5rem;
}
.one-shoprang {
  float: left;
  font-size: 0.7rem;
  color: #444;
  margin-top: 17%;
}
.wei-bao-pei {
  text-align: right;
  margin-top: 37%;
}
.wei-bao-pei div:nth-child(1) {
  font-size: 0.7rem;
  color: #666;
  letter-spacing: 0.1rem;
}
.wei-bao-pei div:nth-child(2) {
  font-size: 1.3rem;
  color: #666;
}
.tang-tab {
  height: 5.5rem;
  border-bottom: 1px solid #ccc;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  overflow: hidden;
}
.tab-1,
.tab-2 {
  flex: 1;
}
.tab-1 span {
  width: 4.5rem;
  height: 2rem;
  background-color: rgba(0, 160, 220, 0.2);
  margin-right: 1rem;
  font-size: 0.7rem;
  line-height: 2rem;
  text-align: center;
}
.tab-2 {
  line-height: 2.5rem;
}
.tab-2 .iconfont {
  font-size: 0.9rem;
}
.tab-2 span {
  font-size: 0.7rem;
  color: #93999f;
}
.rat-content {
  padding: 0 1.5rem;
}
.contents {
  overflow: hidden;
  /* border-bottom: 1px solid #000; */
  margin: 1.5rem 0;
}
.content-left {
  float: left;
  width: 10%;
}
.content-left span {
  width: 30px;
  height: 30px;
  background: url("../../assets/02.png") no-repeat 0 0/30px;
  border-radius: 50%;
  margin-top: 0.4rem;
}
.content-right {
  float: left;
  width: 90%;
}
.right-one span:nth-child(1) {
  font-size: 0.9rem;
}
.right-one span:nth-child(2) {
  float: right;
  font-size: 0.7rem;
  color: #aaa;
}
.right-three {
  font-size: 0.8rem;
}
.right-four span {
  font-size: 0.7rem;
  color: #aaa;
  border: 1px solid #aaa;
  padding: 0 0.3rem;
  margin-right: 0.3rem;
  margin-bottom: 0.1rem;
}
</style>