<template>
  <div>
      <mt-header fixed title="修改用户名" style="font-size:1.1rem;height:3rem;">
        <i class="mintui mintui-back" @click="$router.back()" slot="left"></i>
      </mt-header>
      <div class="setUserName-zhan"></div>
      <div class="setUserName-inp">
        <mt-field  placeholder="请输入用户名" v-model="setname"></mt-field>
      </div>
      <div class="setUserName-btn">
        <mt-button type="primary" size="large" @click.native=set>确认修改</mt-button>
      </div>
  </div>
</template>

<script>
  import { Toast  } from 'mint-ui';
  export default {
              data(){
                return {
                  setname:''
                }
              },
              methods:{
                isSetName(){
                  if(this.setname==''){
                    Toast('还未输入用户名')
                    return false
                  }else{
                    return true
                  }
                },
                set(){
                  if(this.isSetName()){
                      let instance = Toast('修改成功')
                      setTimeout(() => {
                        this.$store.commit('setUserName',{boo:true,userName:this.setname})
                        instance.close();
                        this.$router.back()
                      }, 1500);

                  }
                }
              },
              activated() {
                this.$router.newback=true
                this.setname=''
              }
  }
</script>

<style>
.setUserName-zhan{
  height: 3rem;
}
.setUserName-inp{
  margin: 1rem 0;
}
.setUserName-inp input{
border: 1px solid #26a2ff;
font-size: 0.9rem;
height: 2.5rem;
text-indent: 0.5rem;
border-radius: 20px;
}
.setUserName-btn{
  padding: 0 0.7rem;
}
.setUserName-btn .mint-button--large{
  border-radius: 20px;
}
</style>
