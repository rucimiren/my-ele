import Vue from 'vue'
import {
  Header,
  Button,
  Tabbar,
  TabItem,
  Swipe,
  SwipeItem,
  Search,
  Badge,
  Field,
  Cell,
  Toast,
  Radio
} from 'mint-ui';
// import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store/index.js'
Vue.component("mt-button", Button);
Vue.component("mt-header", Header);
Vue.component("mt-tabbar", Tabbar);
Vue.component("mt-tab-item", TabItem);
Vue.component("mt-swipe", Swipe);
Vue.component("mt-swipe-item", SwipeItem);
Vue.component("mt-search", Search);
Vue.component("mt-badge", Badge);
Vue.component("mt-field", Field );
Vue.component("mt-cell", Cell);
Vue.component("mt-radio", Radio);







new Vue({
  el: '#app',
  router,store,
  components: {
    App
  },
  template: '<App/>'
})


router.beforeEach((to, from, next) => {
  const nextRouter=['redPacket','address']
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0

    if(nextRouter.indexOf(to.name)>-1){
        if(store.state.mobile==""){
          let instance = Toast('登录后查看')
          setTimeout(() => {
            instance.close();
            next({
              name:'login'
            })
          }, 1500);



        }else{
          next()
        }

    }else{
      next()
    }

})
