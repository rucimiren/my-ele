<template>
  <div>
   <mt-header fixed title="登录" style="font-size:1.1rem;height:3rem;">
     <i class="mintui mintui-back" @click="back" slot="left"></i>
   </mt-header>
   <div class="tubiao-e">
     <i class="iconfont iconeliaomocopy"></i>
   </div>
<div class="form">
  <mt-field   placeholder="用户名" type="text" v-model="username"></mt-field>
<mt-field  :attr="{ maxlength: 11 }" placeholder="手机号" type="tel" v-model="phone"></mt-field>
<mt-field  placeholder="密码" type="password" v-model="password"></mt-field>

  <mt-field placeholder="验证码" v-model="yanCode" >
    <img v-if="yanImg" :src="yanImg" height="35px" width="80px" style="vertical-align: middle;">
  </mt-field>
<div class="login-btnYan">
  <mt-button style='background-color: #56d176;' type="primary" size="small" @click.native='getYan'>获取验证码</mt-button>
</div>
<p>温馨提示：未注册的手机号，登录时将自动注册。</p>
<mt-button type="primary" size="large" @click.native='login'>立即登录</mt-button>
</div>


  </div>
</template>

<script>
  import {getLogin,getYan} from '@/api/getData.js'
  import { Indicator,Toast  } from 'mint-ui';
  export default {
    data(){
      return{
            phone:'',
            password:'',
            yanCode:'',
            yanImg:'',
            yanBoo:false,
            username:''
      }
    },
    methods:{
      isUsername(){
        if(this.username!=''){
          return true
        }else{
          Toast('用户名不能为空')
          return false
        }
      },
            isYan(){
              if(this.yanBoo){
                return true
              }else{
                Toast('还未获取验证码')
                return false
              }
            },
            isPhone(){
                  if(/^1[3-9]\d{9}$/.test(this.phone)){
                    return true
                  }else{
                    Toast('手机号格式不正确')
                    return false
                  }
            },
            isPwd(){
              if(/^\w{6,}$/.test(this.password)){
                return true
              }else{
                Toast('密码至少六位')
                return false
              }
            },
          login(){
              if(this.isUsername()&&this.isPhone()&&this.isPwd()&&this.isYan()){
                    Indicator.open('登录中...');
                getLogin(this.phone,this.password,this.yanCode).then(data=>{

                  // console.log(data.data,this.yanCode)
                    if(data.data.status==0){
                       Indicator.close();
                              this.phone='';
                             this.password='';
                             this.yanCode='';
                             this.yanImg='';
                             this.yanBoo=false;
                             this.username='';
                      Toast(data.data.message)
                    }else{
                      Indicator.close();
                      let instance = Toast('登录成功')
                      setTimeout(() => {
                        instance.close();
                        this.$router.back()
                      }, 1500);
                      this.$store.commit('setMobile',{boo:true,mobile:this.phone});
                      this.$store.commit('setId',{boo:true,id:data.data.id})
                      this.$store.commit('setUserId',{boo:true,userId:data.data.user_id})
                      this.$store.commit('setUserName',{boo:true,userName:this.username})
                      this.$store.commit('setAvatar',{boo:true,avatar:data.data.avatar})
                    }
             /*     if(data.data.code==0){
                    let instance = Toast(data.data.msg)
                    setTimeout(() => {
                      instance.close();
                      this.$router.back()
                    }, 1500);
                    this.$store.commit('setMobile',{boo:true,mobile:this.phone});
                    this.$store.commit('setId',{boo:true,id:data.data.data._id})
                    this.$store.commit('setUserId',{boo:true,userId:data.data.data.user_id})
                    this.$store.commit('setUserName',{boo:true,userName:data.data.data.username})

                  }else{
                    Toast(data.data.msg)
                  } */
                })
              }


          },
          getYan(){
            getYan().then(data=>{
              // console.log(data.data)
              if(data.data.status==1){
                this.yanImg=data.data.code
                this.yanBoo=true
              }
            })
          },
		  back(){
			  if(this.$route.params.boo){
          this.$router.newback=true;
          this.$router.push('/user')
        }else{
          this.$router.newback=true;
          this.$router.back()
        }
		  }
    },
    activated() {
      this.$router.newback=true;
      this.phone='';
      this.password='';
      this.yanCode='';
      this.yanImg='';
      this.yanBoo=false;
      this.username='';
    }
  }
</script>

<style >
.tubiao-e{
  margin-top: 4rem;
  text-align: center;
}
.tubiao-e .iconfont{
  font-size: 4rem;
  color:rgb(27, 157, 255);
}
.form{
  margin-top: 2rem;
  padding: 0 3rem;
}
.form input{
border: 1px solid #26a2ff;
font-size: 0.9rem;
height: 2.5rem;
text-indent: 0.5rem;
border-radius: 20px;
}
.form p{
  font-size: 0.9rem;
  color: #26a2ff;
  opacity: 0.7;
  padding-left: 0.4rem;
  margin: 1rem 0;
}
.login-btnYan{
  margin-top: 0.5rem;
  padding: 0 0.5rem;
}
</style>
