import request from '../utils/request'

export function login (username, password){
    // username= JSON.stringify(username)
    return request({
        url:'/user/login',
        method:'post',
        data:{
            username,
            password
        }
    })
}
export function getUserInfo(token){
    return request({
        url:`/user/info?token=${token}`,
        method:'get'
        
    })
}
export function logout(token){
    return request({
        url: `/user/logout`,
        method:'post',
        data:{
            token
        }
    })
}
