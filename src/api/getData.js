import axios from 'axios'
axios.defaults.withCredentials = true;
//获取首页导航栏信息
export const getHomeData = function () {
  return axios({
    url: '/api/common/getHomeData'
  })
}
//获取商家列表
export const getRestaurants = function () {
  return axios({
    url: '/api/shopping/restaurants'
  })
}
//获取商家餐品列表
export const getFoods = function () {
  return axios({
    url: '/api/shopping/goods'
  })
}
//获取商家详情
export const getSeller = function () {
  return axios({
    url: '/api/shopping/seller'
  })
}
//获取商家评价列表
export const getRatings = function () {
  return axios({
    url: '/api/shopping/ratings'
  })
}

/* 以下就是gitHub上的ele接口了 */

//用户登陆(新用户自动注册)
export const getLogin=function(mobile,pwd,code){
      let data=new URLSearchParams();
      data.append("username",mobile);
      data.append('password',pwd);
      data.append('captcha_code',code);
  return axios({
    url:'https://elm.cangdu.org/v2/login',
    method:'post',
    data,
  })
}

//获取验证码
export const getYan=function(){
  return axios({
    url:'https://elm.cangdu.org/v1/captchas',
    method:'post'
  })
}
//增加收货地址
export const plusAddress=function(json,id){
      let data=new URLSearchParams()
      for(let key in json){
        data.append(key,json[key])
      }
  return axios({
    url:'https://elm.cangdu.org/v1/users/'+id+'/addresses',
    method:'post',
    data,
  })
}
//获取收货地址列表
export const getAddress=function(id){
  return axios({
    url:'https://elm.cangdu.org/v1/users/'+id+'/addresses'
  })
}
//删除收货地址
export const delAddress=function(userId,addressId){
  return axios({
    url:'https://elm.cangdu.org/v1/users/'+userId+'/addresses/'+addressId,
    method:'delete'
  })
}
//修改密码
export const setPwd=function(json){
    let data=new URLSearchParams();
    for(let key in json){
      data.append(key,json[key])
    }

  return axios({
    url:'https://elm.cangdu.org/v2/changepassword',
    method:'post',
    data,
  })
}
//退出登录
export const signOut=function(){
  return axios({
    url:'https://elm.cangdu.org/v2/signout'
  })
}
//服务中心
export const explain=function(){
  return axios({
    url:'https://elm.cangdu.org/v3/profile/explain'
  })
}
