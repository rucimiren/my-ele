<template>
  <div id='info'>
        <mt-header fixed title="账户信息" style="font-size:1.1rem;height:3rem;">
          <i class="mintui mintui-back" @click="$router.back()" slot="left"></i>
        </mt-header>
        <div id="info-zhan"></div>
        <div id="info-head">
          <div class="info-head-left">头像</div>
          <div class="info-head-right">
            <img :src="img" width="50" alt="">
             <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy" style="vertical-align: middle;margin-top: 1rem;"></i>
          </div>
        </div>
         <mt-cell title="用户名" @click.native='setusername'>
           <span>{{$store.state.userName}}</span>
             <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy" ></i>
         </mt-cell>
         <div class="info-zhanghao">账户绑定</div>
         <mt-cell title="手机">
           <i class="iconfont iconshouji" slot='icon' style="color: rgb(0, 151, 255);vertical-align: middle;"></i>
           <span>{{$store.state.mobile}}</span>
             <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy" ></i>
         </mt-cell>
         <div class="info-zhanghao">安全设置</div>
         <mt-cell title="登录密码" @click.native='setpwd'>
           <span  style="color: rgb(0, 151, 255);">修改</span>
             <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy" ></i>
         </mt-cell>
          <div class="info-zhanghao">退出</div>
          <div class="info-btn">
            <mt-button type="danger" size="large" @click.native=signout>退出登录</mt-button>
          </div>
  </div>
</template>

<script>
  import {baseImage} from '@/api/imgUrl.js'
   import { Toast  } from 'mint-ui';
  import {signOut} from '@/api/getData.js'
  export default {
            data(){
              return {
                img:''
              }
            },
            methods:{
             setpwd(){
               this.$router.newback=false
               this.$router.push("/setPassword")
             },
              setusername(){
                this.$router.newback=false
                this.$router.push("/setUserName")
              },
              init(){
                    if(this.$store.state.avatar==''){
                      this.img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAM1BMVEXE5/XI6fbT7fjW7/jl9fvw+f3////a8Pnt+PzL6vb7/v7i8/rP7Pf4/P7e8vn0+/3p9vvI4mwRAAACI0lEQVR4Ae3YBxbkIAgGYDCKgqbc/7LbS5hJexvMNr7Xp/0j9oBzzjnnnHPOuX8Qhq/wycwhJvopxQGfSM2F3pXcOZuj0DaJDN1gpSMRoY9B6Jhk6AALnSsI1tpIV0jrX+ZHyp3putwzN9XA8BmHmvolN1LGCWENp5GUADZYVGyGd1lFC4OJmVYqbKu0MoOFem22TPrv3cf004ywa6A1htvStdw2Go+vcC03C5EuzV3pSv/iQsqCllN4gj1tJmWC+342JV1dx8cGBuR8nEbznVHNkQW28UxKBeV+pRtsCrrMEsDGeLIIVlISgg08HqiYSIlgJRxWuoku8wA2VCU3dwVlZugQnE4PnYt+t05wR6FvysmeIPltrC8mC3U97t65bRQq9whO23uC6gRp9sFMa9NOJ8z2wWF3T1BvDfdXzLLb4oL7a1m9P53mq50PwSR42ltA2v6eEC2uFGH38Ja39wRVDUGDTSJudH+ETSg3G6wuESO8anxSpww3xF+aGvX+yWvQZ72rohQ0O+wFeI6q9QiPYr0cPGih31Rs1pfjBy2/KxnlYjJPtTYwNFy7CE5CnyzGxf4pMWzhQkTWyTjTWkV4hVW6PNhjIWUZdF+okgiDnSakSakhMHAItQhpAXom7xN+8nG1OnTawkRXJARzlc5V6KElOpYadJJH2jdm6CjPtG3O0FmL780eY4MncI5J6CtJMTM8iwODc84555xzzv0PPgKMKi2olgNo0QAAAABJRU5ErkJggg=="
                    }else{
                      this.img=baseImage+this.$store.state.avatar
                    }
              },
              signout(){
                        signOut().then(data=>{

                          if(data.data.status==1){
                              
                            let instance = Toast(data.data.message)
                            setTimeout(() => {
                             this.$store.commit('setMobile',{boo:false});
                             this.$store.commit('setId',{boo:false})
                             this.$store.commit('setUserId',{boo:false})
                             this.$store.commit('setUserName',{boo:false})
                             this.$store.commit('setAvatar',{boo:false})
                             this.$router.newback=false
                             this.$router.replace({
                               name:'user',

                             })
                            }, 1500);



                          }
                        })
              }
            },
            activated(){
              this.$router.newback=true
              this.init()
            }
  }
</script>

<style>
  #info-zhan{
    height: 3rem;
  }
#info-head{
  border-bottom: 1px solid #f5f5f5;
  height: 5rem;
  padding: 0 0.7rem;
  overflow: hidden;
}
.info-head-left{
  float: left;
  height: 100%;
  line-height: 5rem;
  font-size: 0.9rem;
}
.info-head-right{
  float: right;
  height: 100%;
}
.info-head-right img{
  vertical-align: middle;
  border-radius: 50%;
  margin-top: 1rem;
}
#info .iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy{
  font-weight: 900;
  color: #6A6A6A;
}
#info .mint-cell-text{
  font-size: 0.9rem;
  }
  .info-zhanghao{
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    background-color: #f5f5f5;
    color:#666;
  }
.info-btn{
  margin-top: 1rem;
}
</style>
