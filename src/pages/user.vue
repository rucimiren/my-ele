<template>
  <div>
   <mt-header fixed title="我的" style="font-size:1.1rem;height:3rem;"></mt-header>
   <div class="user-zhan"></div>
    <header id="user-header" @click="isLogin">
        <div class="user-img">
          <img :src="img" alt="">
        </div>
        <div class="user-content" v-if="$store.state.mobile==''">
          <div class="user-content-child">
                <h3>登录/注册</h3>
                <p>
                  <i class="iconfont iconshouji"></i>
                  <strong>登录后享更多特权</strong>
                   </p>
          </div>
        </div>
        <div class="user-content" v-else>
          <div class="user-content-child">
                <h3>{{$store.state.userName}}</h3>
                <p>
                  <i class="iconfont iconshouji"></i>
                  <strong>{{$store.state.mobile}}</strong>
                   </p>
          </div>
        </div>
        <div class="user-go">
          <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy"></i>
        </div>
    </header>
    <nav id="user-nav">
      <div class="nav-qianbao">
        <p><span style="color:#4aa5f0;font-size:1.7rem">0.00</span>元</p>
        <p>钱包</p>
      </div>
      <div class="nav-hongbao" @click="$router.push('/redPacket')">
        <p><span style="color:#4aa5f0;font-size:1.7rem">0</span>个</p>
        <p>红包</p>
      </div>
      <div class="nav-jinbi">
        <p><span style="color:#E4393C;font-size:1.7rem">0</span>个</p>
        <p>金币</p>
      </div>
    </nav>
    <div id="user-loca">
      <mt-cell
        title="我的地址"
          @click.native="$router.push('/address')"
        >
        <i class="iconfont iconlocation" slot='icon' style="color:rgb(74, 165, 240);font-size:1.2rem;vertical-align: middle;"></i>
        <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy"></i>
      </mt-cell>
    </div>
  <div  id="user-shangcheng">
       <mt-cell
        title="金币商城"
        style='border-bottom: 1px solid #f1f1f1;'
        >
        <i class="iconfont iconshangcheng1" slot='icon' style="color:rgb(148, 217, 74);font-size:1rem;vertical-align: middle;"></i>
        <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy"></i>
      </mt-cell>
      <mt-cell
        title="分享拿10元现金"

        >
        <i class="iconfont iconliwu" slot='icon' style="color:rgb(252, 123, 83);font-size:1.2rem;vertical-align: middle;"></i>
        <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy"></i>
      </mt-cell>
  </div>

  <div id="user-kefu">
    <mt-cell
      title="我的客服"
      style='border-bottom: 1px solid #f1f1f1;'
      @click.native="$router.push('/service')"
      >
      <i class="iconfont iconwodekefu" slot='icon' style="color:rgb(74, 165, 240);font-size:1rem;vertical-align: middle;"></i>
      <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy"></i>
    </mt-cell>
    <mt-cell
      title="下载饿了么APP"
        @click.native="$router.push('/downLoad')"
      >
      <i class="iconfont iconeliaomo" slot='icon' style="color:rgb(74, 165, 240);font-size:1em;vertical-align: middle;"></i>
      <i class="iconfont iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy"></i>
    </mt-cell>


  </div>



  </div>
</template>

<script>
  import { ACTIVE } from "@/api/const";
import {baseImage} from '@/api/imgUrl.js'
  export default {
     props:['selected'],
    data(){
      return{
            img:''
      }
    },
    methods:{
      isLogin(){
        if(this.$store.state.mobile!=''){
          this.$router.push('/info')

        }else{
          this.$router.push('/login')
        }
      },
      init(){
        if(this.$store.state.avatar==''){
          this.img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAM1BMVEXE5/XI6fbT7fjW7/jl9fvw+f3////a8Pnt+PzL6vb7/v7i8/rP7Pf4/P7e8vn0+/3p9vvI4mwRAAACI0lEQVR4Ae3YBxbkIAgGYDCKgqbc/7LbS5hJexvMNr7Xp/0j9oBzzjnnnHPOuX8Qhq/wycwhJvopxQGfSM2F3pXcOZuj0DaJDN1gpSMRoY9B6Jhk6AALnSsI1tpIV0jrX+ZHyp3putwzN9XA8BmHmvolN1LGCWENp5GUADZYVGyGd1lFC4OJmVYqbKu0MoOFem22TPrv3cf004ywa6A1htvStdw2Go+vcC03C5EuzV3pSv/iQsqCllN4gj1tJmWC+342JV1dx8cGBuR8nEbznVHNkQW28UxKBeV+pRtsCrrMEsDGeLIIVlISgg08HqiYSIlgJRxWuoku8wA2VCU3dwVlZugQnE4PnYt+t05wR6FvysmeIPltrC8mC3U97t65bRQq9whO23uC6gRp9sFMa9NOJ8z2wWF3T1BvDfdXzLLb4oL7a1m9P53mq50PwSR42ltA2v6eEC2uFGH38Ja39wRVDUGDTSJudH+ETSg3G6wuESO8anxSpww3xF+aGvX+yWvQZ72rohQ0O+wFeI6q9QiPYr0cPGih31Rs1pfjBy2/KxnlYjJPtTYwNFy7CE5CnyzGxf4pMWzhQkTWyTjTWkV4hVW6PNhjIWUZdF+okgiDnSakSakhMHAItQhpAXom7xN+8nG1OnTawkRXJARzlc5V6KElOpYadJJH2jdm6CjPtG3O0FmL780eY4MncI5J6CtJMTM8iwODc84555xzzv0PPgKMKi2olgNo0QAAAABJRU5ErkJggg=="
        }else{
          this.img=baseImage+this.$store.state.avatar
        }
      }
    },
    activated(){
      this.$emit('update:selected','我的')
      sessionStorage.setItem(ACTIVE, '我的');
      this.init()
    }
  }
</script>

<style >
  .user-zhan{
    height: 3rem;
  }
#user-header{
  display: flex;
  height: 6.5rem;
  padding: 0 0.8rem;
  background-color: #4aa5f0;
  overflow: hidden;
}
#user-header>div{
  flex: 1;
  /* border: 1px solid #fff; */
}
#user-header .user-content{
  flex: 4;
}

.user-img img{
  width: 100%;
  border-radius: 50%;
  margin-top: 1.4rem;
}
.user-content-child{
  padding: 0 1rem;
  color:#fff;
  margin-top: 1.4rem;
}
.user-content-child p{
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
.user-go{
  color: #fff;
  text-align: right;
  line-height: 5.5rem;
  font-weight: 900;
}
#user-nav{
  margin-top: 0;
  height: 5.5rem;
  display: flex;
   border-bottom: 0.7rem solid #f5f5f5;
   overflow: hidden;
}
#user-nav>div{
  flex: 1;
  display: flex;
  flex-direction: column;
}
#user-nav>div>p{
  flex: 1;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}
#user-nav>div>p:nth-child(1){
  line-height: 2.5rem;
}
.nav-hongbao{
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
#user-loca,#user-shangcheng,#user-kefu{
  border-bottom: 0.7rem solid #f5f5f5;
  }
  .iconiconfontyoujiantou-copy-copy-copy-copy-copy-copy{
    font-weight: 900;
  }

</style>
