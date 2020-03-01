<template>
  <div>
      <mt-header fixed title="客服" style="font-size:1.1rem;height:3rem;">
        <i class="mintui mintui-back" @click="back" slot="left"></i>
      </mt-header>
      <div id="service-head">
        <div class="service-head-zaixian">
                  <span><i class="iconfont iconkefu" style="font-size: 1.6rem;color: rgb(255, 123, 82);"></i></span>
                  <span>在线客服</span>
        </div>
        <div class="service-head-phone">
          <span><i class="iconfont icondianhua" style="font-size: 1.3rem;color: rgb(106, 194, 11);"></i></span>
          <span>电话客服</span>
        </div>
      </div>
      <div class="service-hot">
        <mt-cell title="热门问题">
        </mt-cell>
      </div>
      <div class="service-question">
        <mt-cell :title="serverJson[item]" v-for='(item,index) in serverArr' :key='index' @click.native='serverHandler(serverArrContent[index],item)'>
            <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy" ></i>
        </mt-cell>
      </div>


  </div>
</template>

<script>
  import {explain} from '@/api/getData.js'
  export default {
          data(){
            return {
                    serverJson:'',
                    serverArr:['supervipCaption','signCaption','rankCaption','pointtextCaption','phototutorialCaption','paymentCaption','otherCaption','ontimeCaption','memberTimesCaption','memberPartCutCaption','memberFullCutCaption','memberCaption','hongbaoCaption','freshmanCaption','forgotCaption','discountCaption','disclaimerCaption','couponCaption','businessCaption','balanceCaption','awesomeRestaurantCaption','anonymousBuyCaption','activityCaption'],
                    serverArrContent:['supervipContent','signContent','rankContent','pointtextContent','phototutorialContent','paymentContent','otherContent','ontimeContent','memberTimesContent','memberPartCutContent','memberFullCutContent','memberContent','hongbaoContent','freshmanContent','forgotContent','discountContent','disclaimerContent','couponContent','businessContent','balanceContent','awesomeRestaurantContent','anonymousBuyContent','activityContent'],
                    serverPath:[]
            }
          },
          methods:{
            back(){

              this.$router.back()
            },
            init(){
              explain().then(data=>{
                // console.log(data.data)
                this.serverJson=data.data
              })
            },
            serverHandler(con,tit){
              this.$router.newback=false
              this.$router.push({
                name:'questionDetail',
                params:{
                  title:this.serverJson[tit],
                  content:this.serverJson[con]
                }
              })
            }
          },
          activated() {
            this.$router.newback=true
            this.init()
          }
  }
</script>

<style>
#service-head{
  margin-top: 3rem;
  height: 6rem;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  overflow: hidden;
}
#service-head>div{
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.service-head-zaixian{
  border-right:1px solid #f1f1f1 ;
}
#service-head>div>span{
  flex: 1;
  font-size: 0.9rem;
  color:#666;
}
#service-head>div>span:nth-child(1){
  line-height: 3rem;
}
.service-hot .mint-cell{
      min-height: 5rem;
      border-bottom: 1px solid #f1f1f1;
  }
.service-hot .mint-cell-title{
  font-size: 1.5rem;
}
.service-question .mint-cell{
  min-height: 2.5rem;
  border-bottom: 1px solid #f1f1f1;
}
.service-question .mint-cell-title{
  color: #666;
  font-size: 0.9rem;
}
</style>
