<template>
  <div>
      <mt-header fixed title="添加地址" style="font-size:1.1rem;height:3rem;">
        <i class="mintui mintui-back" @click="$router.back()" slot="left"></i>
      </mt-header>
      <div id="plus-zhan"></div>
      <div id="plus-form">
          <mt-field label="联系人" placeholder="你的姓名" v-model="form.name"></mt-field>
          <mt-field label="电话" placeholder="你的手机号" type="tel" v-model="form.phone"></mt-field>
          <mt-field label="备注电话" placeholder="备注手机号" type="tel" v-model="form.phone_bk"></mt-field>
          <mt-field label="地址" placeholder="小区、写字楼、学校等" v-model="form.address"></mt-field>
          <mt-field label="门牌号" placeholder="请输入门牌号" v-model="form.address_detail"></mt-field>

      </div>
      <mt-radio
        title="性别"
        v-model="value"
        :options="['男', '女']"
        align='left'>
      </mt-radio>
      <div id="plus-btn">
          <mt-button type="primary" size="large" @click.native=plusAddress>保存</mt-button>
      </div>
  </div>
</template>

<script>
  import { Indicator,Toast  } from 'mint-ui';
  import {plusAddress} from '@/api/getData.js'
  export default {
        data(){
          return {
           form:{
             name:'',
             phone:'',
             phone_bk:'',
             address:'',
              address_detail:'',
              geohash:'31.22967,121.4762',
              tag:'家',
              tag_type:'2',
              sex:''
           },
           value:''

          }
        },
        methods:{
              isName(){
                if(this.form.name!=''){
                  return true
                }else{
                  Toast('联系人不能为空')
                  return false
                }
              },
              isPhone(){
                if(/^1[3-9]\d{9}$/.test(this.form.phone)){
                  return true
                }else{
                  Toast('手机号格式不对')
                  return false
                }
              },
              isPhone_bk(){
                if(/^1[3-9]\d{9}$/.test(this.form.phone_bk)){
                  return true
                }else{
                  Toast('备注手机号格式不对')
                  return false
                }
              },
              isAddress(){
                if(this.form.address!=''){
                  return true
                }else{
                  Toast('地址不能为空')
                  return false
                }
              },
              isAddress_detail(){
                if(this.form.address_detail!=''){
                  return true
                }else{
                  Toast('门牌号不能为空')
                  return false
                }
              },
              isSex(){
                if(this.value==''){
                  Toast('性别还没有选择')
                  return false
                }else{
                  if(this.value=='男'){
                    this.form.sex=1
                }else{
                  this.form.sex=2
                }
                return true
              }
                },

                plusAddress(){
                 if(this.isName()&&this.isPhone()&&this.isPhone_bk()&&this.isAddress()&&this.isAddress_detail()&&this.isSex()){
                    plusAddress(this.form,this.$store.state.userId).then(data=>{

                      if(data.data.status==1){
                    
                        let instance = Toast(data.data.success)
                        setTimeout(() => {
                          instance.close();
                          this.$router.back()
                        }, 1500);
                      }else{
                        Toast(data.data.message)
                      }
                    })
                 }
                }, //plusAddress结尾

  },//methods结尾
  activated() {
    this.$router.newback=true
    this.form={
             name:'',
             phone:'',
             phone_bk:'',
             address:'',
              address_detail:'',
              geohash:'31.22967,121.4762',
              tag:'家',
              tag_type:'2',
              sex:''
           }
           this.value=''
  }

  }
</script>

<style>
  #plus-zhan{
    height: 3rem;
  }
  #plus-form{
    overflow: hidden;
  }
  #plus-form .mint-cell{
    min-height: 45px;
    border-bottom: 1px solid #f1f1f1;
  }
  #plus-form .mint-cell-wrapper{
    font-size: 0.9rem;
  }
  #plus-btn{
    padding: 1.5rem 1.5rem;
  }
  .mint-radiolist{
    border-bottom: 1px solid #f1f1f1;
  }
.mint-radiolist .mint-cell{
  display: inline-block;
  min-height: 30px;
  }
  .mint-radiolist-title{
    display: inline-block;
    vertical-align:top;
    color: #000000;
    font-size: 0.8rem;
  }
  .mint-radiolist-label{
    font-size: 0.8rem;
    margin-left: 3rem;
  }
</style>
