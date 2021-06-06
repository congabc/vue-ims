import Vue from "vue";
import Vuex from "vuex";
// import {PcCookie ,Key} from '@/utils/cookie'
import { login,logout } from "@/api/login";
import { PcCookie, Key } from '@/utils/cookie'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:PcCookie.get(Key.userInfoKey) ?JSON.parse(PcCookie.get(Key.userInfoKey)):null,
    accessToken:PcCookie.get(Key.accessTokenKey),
    refreshToken:PcCookie.get(Key.refreshTokenKey),
    iftrue:true,
  },
  mutations: {
    // 改变状态值
    SET_USER_STATE (state ,data){
      const {userInfo , refresh_token , access_token} =data
      // 赋值状态
      state.userInfo =userInfo
      state.accessToken =access_token
      state.refreshToken =refresh_token
      state.iftrue= userInfo.role,

      // 保存到cookie
      PcCookie.set(Key.userInfoKey,userInfo)
      PcCookie.set(Key.accessTokenKey, access_token)
      PcCookie.set(Key.refreshTokenKey, refresh_token)
    },
    // 重置
    RESET_USER_STATE (state){
      state.userInfo=null
      state.accessToken=null
      state.refreshToken=null
      state.iftrue=null

      PcCookie.remove(Key.userInfoKey)
      PcCookie.remove(Key.accessTokenKey)
      PcCookie.remove(Key.refreshTokenKey)
    }
  },
  actions: {
    
    // 登录
    UserLogin ({commit} ,userData){
      const {username , password} =userData
      return new Promise ((resolve ,reject) =>{
        login(username.trim(),password).then(response=>{
          console.log(response)
          const {code , data} =response
          if(code === 200){
            commit("SET_USER_STATE", data)
          }
          resolve(response)
        }).catch(error =>{
          commit("RESET_USER_STATE")
          reject(error)
        })
      })
    },
    // 退出
    UserLogout({state,commit}){
      return new Promise ((resolve ,reject) =>{
        logout(state.accessToken).then(response=>{
          commit('RESET_USER_STATE')
          
          resolve(response)
        }).catch(error=>{
          commit('RESET_USER_STATE')
          reject(error)
          
        })
      })
    }
  },
  modules: {},
});
