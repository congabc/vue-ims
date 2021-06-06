import request from '../utils/request'

export function getList() {
    return request({
        url: '/home/img',
        method: 'get',
    })

}