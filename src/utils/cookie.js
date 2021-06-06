import Cookies from 'js-cookie'

// Cookie的Key值
export const Key = {
    accessTokenKey: 'accessToken', // 访问令牌在cookie的key值 
    refreshTokenKey: 'refreshToken', // 刷新令牌在cookie的key值 
    userInfoKey: 'userInfo'
}
// 创建cookie类
class CookieClass{
    // 构造函数
    constructor(){
        this.domain = 'localhost' // 域名
        this.expireTime=30 //过期时间
    }
    // 设置cookie
    set(key, value , expires, path = '/') {
        CookieClass.checkKey(key)
        Cookies.set(key , value ,{expires:expires || this.expireTime ,path:path ,domain: this.domain})
    }

    // 获取cookie
    get(key){
        CookieClass.checkKey(key)
        return Cookies.get(key)
    }

    // 删除cookie
    remove(key ,path='/'){
        CookieClass.checkKey(key)
        Cookies.remove(key,{path:path ,domain:this.domain})
    }
    // 检查kay值
    static checkKey(key){
        if(!key){
            throw new Error("没有找到key")
        }
        if(typeof key === 'object'){
            throw new Error("key不是一个对象")
        }
    }
}
// 导出
export const PcCookie = new CookieClass()