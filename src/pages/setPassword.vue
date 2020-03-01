<template>
  <div>
        <mt-header fixed title="重置密码" style="font-size:1.1rem;height:3rem;">
          <i class="mintui mintui-back" @click="$router.back()" slot="left"></i>
        </mt-header>
        <div class="setpwd-zhan"></div>
        <div class="setpwd-form">
          <mt-field  placeholder="请输入手机号" v-model="form.username"></mt-field>
          <mt-field type="password"  placeholder="旧密码" v-model="form.oldpassWord"></mt-field>
          <mt-field type="password"  placeholder="新密码" v-model="form.newpassword"></mt-field>
          <mt-field type="password"  placeholder="确认密码" v-model="form.confirmpassword"></mt-field>
          <mt-field  placeholder="验证码" v-model="form.captcha_code">
            <img  :src="yanImg" height="35px" width="80px" style="vertical-align: middle;">
           <span class="setpwd-form-yan-huan">
             <span>看不清</span>
             <span @click="huan">换一张</span>
           </span>
          </mt-field>
        </div>
        <div class="setpwd-btn">
          <mt-button type="primary" size="large" @click.native='set'>确认修改</mt-button>
        </div>
  </div>
</template>

<script>
  import {getYan,setPwd} from '@/api/getData.js'
  import { Indicator,Toast  } from 'mint-ui';
  export default {
              data(){
                return {
                  form:{
                        username:'',
                        oldpassWord:'',
                        newpassword:'',
                        confirmpassword:'',
                        captcha_code:''
                  },
                  yanImg:''
                }
              },
              methods:{
                init(){
                      getYan().then(data=>{
                        // console.log(data.data)
                        if(data.data.status==1){
                          this.yanImg=data.data.code

                        }
                      })
                },//init
                huan(){
                  this.init()
                },//huan
                isMobile(){
                      if(this.form.username==this.$store.state.mobile){
                        return true
                      }else{
                        Toast('和登录的手机号不一致')
                        return false
                      }
                },//
                isOldPwd(){
                            if(this.form.oldpassWord!=''){
                              return true
                            }else{
                              Toast('旧密码不能为空')
                              return false
                            }

                },//
                isNewPwd(){
                            if(/^\w{6,}$/.test(this.form.newpassword)){
                              return true
                            }else{
                              Toast('新密码至少六位')
                              return false
                            }

                },//
                isConPwd(){
                    if(this.form.confirmpassword==this.form.newpassword){
                      return true
                    }else{
                      Toast('两次密码不一致')
                      return false
                    }

                },//
                isYanCode(){
                  if(this.form.captcha_code!=''){
                     return true
                  }else{
                    Toast('验证码不能为空')
                    return false
                  }

                },//
                set(){
                  if(this.isMobile()&&this.isOldPwd()&&this.isNewPwd()&&this.isConPwd()&&this.isYanCode()){
                    setPwd(this.form).then(data=>{
                      // console.log(data.data)
                      if(data.data.status==0){
                        let instance = Toast(data.data.message)
                        setTimeout(() => {
                         this.form={
                           username:'',
                           oldpassWord:'',
                           newpassword:'',
                           confirmpassword:'',
                           captcha_code:''
                         }
                         this.init()
                        }, 1500);

                      }else{
                          let instance = Toast(data.data.success)
                          setTimeout(() => {
                           this.form={
                             username:'',
                             oldpassWord:'',
                             newpassword:'',
                             confirmpassword:'',
                             captcha_code:''
                           }
                           this.init()
                           this.$store.commit('setMobile',{boo:false});
                           this.$store.commit('setId',{boo:false})
                           this.$store.commit('setUserId',{boo:false})
                           this.$store.commit('setUserName',{boo:false})
                           this.$store.commit('setAvatar',{boo:false})
                           this.$router.newback=false
                           this.$router.replace({
                             name:'login',
                             params:{
                               boo:true
                             }
                           })
                          }, 1500);

                      }
                    })

                  }
                },//

              },//methods结尾
              activated() {
                this.$router.newback=true
                this.init()
                this.form={
                  username:'',
                  oldpassWord:'',
                  newpassword:'',
                  confirmpassword:'',
                  captcha_code:''
                }
              }
  }
</script>

<style>
  .setpwd-zhan{
    height: 3rem;
  }
  .setpwd-form{
    margin: 0.5rem 0;
  }
.setpwd-form input{
border: 1px solid #26a2ff;
font-size: 0.9rem;
height: 2.5rem;
text-indent: 0.5rem;
border-radius: 20px;
}

.setpwd-btn{
  margin-top: 1rem;
  padding: 0 0.7rem;
}
.setpwd-btn .mint-button--large{
  border-radius: 20px;
}
.setpwd-form-yan-huan{
  float: right;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  height: 35px;
}
.setpwd-form-yan-huan span{
  flex: 1;
  font-size: 0.7rem;
  line-height: 17px;
  color:#666;
}
.setpwd-form-yan-huan span:nth-child(2){
  color:#26a2ff;
}
.setpwd-form .mint-field{
  margin-bottom: 0.5rem;
}
</style>
