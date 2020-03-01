<template>
  <div>
        <mt-header fixed :title="title" style="font-size:1.1rem;height:3rem;">
          <i class="mintui mintui-back" @click="$router.back()" slot="left"></i>
        </mt-header>
        <div class="question-zhan"></div>
        <div class="question-content" v-html="content" v-if="boo">
        </div>
        <div class="question-content-http"  v-else-if="httpBoo">
          <img src="http://fuss10.elemecdn.com/5/de/5efc9ee81ceba1ae835b0c2298ba9jpeg.jpeg" alt="">
          <p>1. 清晰 拍照时持稳手机，避免出现大幅度晃动。将焦点对准食物本身，锁焦后、点击快门。</p>
          <img src="http://fuss10.elemecdn.com/8/89/4920bc3a0a34c0d26a4460ce03157jpeg.jpeg" alt="">
          <p>2. 光线 尽量选择明亮、柔和的光线，避免强光直射；拍摄时避免身体或器物的阴影遮住食物本身，有条件时，可以用小型手电进行补光，以提高食物质感。</p>
          <img src="http://fuss10.elemecdn.com/4/9b/ca198810b12c8fc57ae562c6fa92cjpeg.jpeg" alt="">
          <p>3. 构图 构图可以选择通用的三分构图法或中心构图法，如果是拍摄整体食物时，需要考虑食物的完整性；如果拍摄特写时，需要将细节体现清楚。</p>
          <img src="http://fuss10.elemecdn.com/c/3b/958696046787bb467708c8d9a5171jpeg.jpeg" alt="">
          <p>4.角度 可以选择45度拍摄、90度俯拍或者水平拍摄，一切都看你的心情哦~</p>
          <img src="http://fuss10.elemecdn.com/2/d3/d31b1f81eb853c6042b9c172a514bjpeg.jpeg" alt="">
          <p>5. 背景 可以选择合适的背景拍摄，例如黑色能体现食物蒸腾的热气，白色让食物更有质感，米色更加温馨等；但背景尽量不要太乱，以免影响整体效果。</p>
          <img src="http://fuss10.elemecdn.com/a/fe/b9716e028917fd81f6c5a99242b6fjpeg.jpeg" alt="">
          <p>6. 细节 餐具的搭配使用、人物的烘托、道具的陪衬等都能使食物更具诱惑力，照片更有氛围。</p>
        </div>
          <div class="question-content-https"  v-else>
            <img src="https://fuss10.elemecdn.com/f/08/bb0bcfc2a10e26524633e38ea47f6jpeg.jpeg" alt="">
          </div>
  </div>
</template>

<script>
  export default {
        data(){
          return {
            title:'',
            content:'',
            boo:true,
            httpBoo:false,

          }
        },
          methods:{
            init(){
              if(this.$route.params.title){
                this.title=this.$route.params.title
                this.content=this.$route.params.content

                if(/http:/.test(this.content)){
                  this.boo=false;
                  this.httpBoo=true
                }else if(/https:/.test(this.content)){
                  this.boo=false;
                  this.httpBoo=false
                }
              }else{
                this.$router.back()
              }
            }
          },
          activated() {
              this.boo=true;
              this.httpBoo=false
                this.$router.newback=true
               this.init()
          }
  }
</script>

<style>
  .question-zhan{
    height: 3rem;
  }
.question-content{
  padding: 0.5rem 1rem;
  text-indent: 2rem;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4rem;
}
.question-content-https img{
    width: 100%;
}
.question-content-http{
  padding: 0.5rem 1rem;
}
.question-content-http img{
  width: 100%;
}
.question-content-http p{
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #666;
  text-indent: 2rem;
}
</style>
