<template>
  <div id="app">


      <transition :name='transition'>
<keep-alive>
          <router-view class="view"></router-view>
</keep-alive>
      </transition>

  </div>
</template>

<script>
export default {
  data(){
    return {
      transition:'slide-left'
    }
  },
  watch:{
          $route(to,from){
            let back=this.$router.newback;
            if(back){
              this.transition='slide-right'
            }else{
              this.transition='slide-left'
            }
            this.$router.newback=false
          }
  }
};
</script>

<style>
html,
body,
h1,
h2,
h3,
h4,
h5,
input,
div,
span,
ul,
ol,
dl,
li,
dd,
dt,
table,
tr,
th,
td,
nav,
header,
footer,
p {
  margin: 0;
  padding: 0;
  list-style: none;
}
span,
em,
i,
b {
  display: inline-block;
}

.view {

  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  transition: all 0.3s linear;

}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>
