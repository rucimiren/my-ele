<template>
  <div>
          <mt-header fixed title="我的地址" style="font-size:1.1rem;height:3rem;">
            <i class="mintui mintui-back" @click="$router.back()" slot="left"></i>
          </mt-header>
          <div id="address-zhan"></div>

          <div id="address-location" v-for="(item,index) in addressList" :key='index'>
         <div class="address-location-left">
           <div class="address-location-address">
             <h5>{{item.address}}</h5>
           </div>
           <div class="address-location-address_detail">
             <span>{{item.address_detail}}</span>
           </div>
           <div class="address-location-name">
             <span>{{item.name}}({{item.sex==1?'先生':'女士'}})</span>
             <span>{{item.phone}}</span>
           </div>
         </div>
         <div class="address-location-right">
           <mt-button @click.native='del(item.id)' type="danger" size="small" style='margin: 0.5rem 0 0 0.5rem;'>删除</mt-button>
         </div>
          </div>



          <div class="address-footer-zhan"></div>
          <footer id="address-footer" @click="address">
              <img src="../assets/add.png" style="vertical-align: middle;" width="25" alt="">
              <span style="color: #3190e8;vertical-align: middle;">新增收货地址</span>
          </footer>
  </div>
</template>

<script>
  import {getAddress,delAddress} from '@/api/getData.js'
  import { Toast  } from 'mint-ui';
  export default {
    data(){
      return {
          addressList:[]
      }
    },
    methods:{
      address(){
        this.$router.newback=false
        this.$router.push('/plusAddress')
      },
      init(){
        getAddress(this.$store.state.userId).then(data=>{
          // console.log(data.data)
          this.addressList=data.data
        })
      },
      del(addressId){

        delAddress(this.$store.state.userId,addressId).then(data=>{
          // console.log(data.data)
          if(data.data.status==1){
            let instance = Toast(data.data.success)
            setTimeout(() => {
              instance.close();
              this.init()
            }, 1500);
          }else{
             Toast(data.data.message)
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
  #address-zhan{
    height: 3rem;
  }
#address-footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 7vh;
  background-color: #f5f5f5;
  text-align: center;
  line-height: 7vh;
}
#address-location{
  overflow: hidden;
  padding:1rem 0.5rem;
  border-bottom:1px solid #f1f1f1 ;
  }
  .address-location-left{
    float: left;
    width: 80%;
    /* background-color: cyan; */
  }
  .address-location-right{
    float: right;
    width: 20%;
    /* background-color: hotpink; */
  }
  .address-location-address_detail{
    font-size: 0.8rem;
    color:#444;
  }
  .address-location-name{
    font-size: 0.7rem;
    color:#666;
  }
  .address-location-left>div{
    margin-bottom: 0.3rem;
  }
  .address-footer-zhan{
    height: 7vh;
  }
</style>
