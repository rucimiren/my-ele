import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)


export default new Vuex.Store({
    state:{
      mobile:sessionStorage.getItem('mobile')?sessionStorage.getItem('mobile'):'',
      id:sessionStorage.getItem('id')?sessionStorage.getItem('id'):'',
      userId:sessionStorage.getItem('userId')?sessionStorage.getItem('userId'):'',
      userName:sessionStorage.getItem('userName')?sessionStorage.getItem('userName'):'',
      avatar:sessionStorage.getItem('avatar')?sessionStorage.getItem('avatar'):'',
      
    },

    mutations:{
      setMobile(state,newVal){

        if(newVal.boo){
          sessionStorage.setItem("mobile",newVal.mobile)
          state.mobile=newVal.mobile
        }else{
          sessionStorage.removeItem('mobile')
          state.mobile=''
        }
      },
      setId(state,newVal){

        if(newVal.boo){
          sessionStorage.setItem("id",newVal.id)
          state.id=newVal.id
        }else{
          sessionStorage.removeItem('id')
          state.id=''
        }
      },
      setUserId(state,newVal){

        if(newVal.boo){
          sessionStorage.setItem("userId",newVal.userId)
          state.userId=newVal.userId
        }else{
          sessionStorage.removeItem('userId')
          state.userId=''
        }
      },
      setUserName(state,newVal){

        if(newVal.boo){
          sessionStorage.setItem("userName",newVal.userName)
          state.userName=newVal.userName
        }else{
          sessionStorage.removeItem('userName')
          state.userName=''
        }
      },
      setAvatar(state,newVal){

        if(newVal.boo){
          sessionStorage.setItem("avatar",newVal.avatar)
          state.avatar=newVal.avatar
        }else{
          sessionStorage.removeItem('avatar')
          state.avatar=''
        }
      },

    }



})
