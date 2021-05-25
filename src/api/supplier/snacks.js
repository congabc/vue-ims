import request from '@/utils/request'

export function getList() {
    return request({
        url: '/channel/wholesale',
        method: 'get',
    })
}
    // 分页搜索方法
    // page 当前页码, size每页查询条数, searchMap条件查询的条件值
export function pagingList10(page, size, formInline) {
    return request({
        url: `/supplier/snacks10?page=${page}&size=${size}`,
        method: 'get',
        data: formInline
    })
}
export function pagingList20(page, size, formInline) {
    return request({
        url: `/supplier/snacks20?page=${page}&size=${size}`,
        method: 'get',
        data: formInline
    })
}
export function purchaseList(id ) {
    return request({
        url: `/supplier/snacks/purchaseList?page=${id}`,
        method: 'get',
    })
}