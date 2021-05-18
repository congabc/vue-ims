import request from '@/utils/request'



// 校验密码, userId, password 旧密码
export function checkPwd(userId, password) {
    return request({
        url: '/user/pwd',
        method: 'post',
        data: {
            userId,
            password
        }
    })
}

    // 修改密码userId 用户ID, password 新密码
export function updatePwd(userId, password) {
    return request({
        url: '/user/pwd',
        method: 'put',
        data: {
            userId,
            password
        }
    })
}