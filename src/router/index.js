import Vue from 'vue'
import Router from 'vue-router'
Router.prototype.newback=false
const Index = () => import("@/pages/index")
const Home = () => import("@/pages/home")
const Shop = () => import("@/pages/shop")
const Search = () => import("@/pages/search")
const orderForm = () => import("@/pages/orderForm")
const Discover = () => import("@/pages/discover")
const login = () => import("@/pages/login")
const user = () => import("@/pages/user")
const downLoad = () => import("@/pages/downLoad")
const service = () => import("@/pages/service")
const redPacket = () => import("@/pages/redPacket")
const address = () => import("@/pages/address")
const plusAddress = () => import("@/pages/plusAddress")
const info = () => import("@/pages/info")
const setUserName = () => import("@/pages/setUserName")
const setPassword = () => import("@/pages/setPassword")
const ShopDetail = () => import("@/pages/shopDetail")
const OrderFood = () => import("@/pages/shopDetail/orderFood")
const OrderShop = () => import("@/pages/shopDetail/orderShop")
const OrderRang = () => import("@/pages/shopDetail/orderRang")
const questionDetail=()=>import("@/pages/service/questionDetail")

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Index,
      children: [{
          path: '/',
          component: Home
        },
        {
          path: "/discover",
          component: Discover,
          name: 'discover'
        },
        {
          path:'/orderForm',
          component:orderForm,
          name:'orderForm'
        },
        {
          path:'/user',
          component:user,
          name:'user'
        }
      ]
    },
    {
      path: "/shop",
      component: Shop,
      name: "shop"
    },
    {
      path: "/search",
      component: Search,
      name: "search"
    },
    {
      path: '/shopDetail',
      component: ShopDetail,
      name: 'shopDetail',
      children: [{
          path: "/shopDetail",
          component: OrderFood
        },
        {
          path: '/shopDetail/orderShop',
          component: OrderShop,
          name: 'orderShop'
        },
        {
          path: '/shopDetail/orderRang',
          component: OrderRang,
          name: 'orderRang'
        }
      ]
    },
	{
		path:"/login",
		component:login,
		name:'login'
	},
  {
    path:'/downLoad',
    component:downLoad,
    name:'downLoad'
  },
  {
    path:'/service',
    component:service,
    name:'service'
  },
  {
    path:'/redPacket',
    component:redPacket,
    name:'redPacket'
  },
  {
    path:'/address',
    component:address,
    name:'address'
  },
  {
    path:'/plusAddress',
    component:plusAddress,
    name:'plusAddress'
  },
  {
    path:'/info',
    component:info,
    name:'info'
  },
  {
    path:'/setUserName',
    component:setUserName,
    name:'setUserName'
  },
  {
    path:'/setPassword',
    component:setPassword,
    name:'setPassword'
  },
  {
    path:'/questionDetail',
    component:questionDetail,
    name:'questionDetail'
  }
  ]
})
