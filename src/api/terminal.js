import request from '@/utils/request'

export function getList() {
    return request({
        url: '/channel/terminal',
        method: 'get',
    })
}
    // 分页搜索方法
    // page 当前页码, size每页查询条数, searchMap条件查询的条件值
export function pagingList10(page, size, formInline) {
    return request({
        url: `/channel/terminal10?page=${page}&size=${size}`,
        method: 'get',
        data: formInline
    })
}
export function pagingList20(page, size, formInline) {
    return request({
        url: `/channel/terminal20?page=${page}&size=${size}`,
        method: 'get',
        data: formInline
    })
}
export function pagingList50(page, size, formInline) {
    return request({
        url: `/channel/terminal50?page=${page}&size=${size}`,
        method: 'get',
        data: formInline
    })
}
export function fenpei(data) {
    return request({
        url: `/supplier/terminal/fenpei`,
        method: 'post',
        data:data
    })
}
export function examine(id) {
    return request({
        url: `/supplier/terminal/examine?id=${id}`,
        method: 'get',
    })
}