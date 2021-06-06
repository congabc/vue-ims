import request from '@/utils/request'


    // 分页搜索方法
    // page 当前页码, size每页查询条数, searchMap条件查询的条件值
export function pagingList10(page, size, formInline) {
    return request({
        url: `/staff/motorman?page=${page}&size=${size}`,
        method: 'get',
        data: formInline
    })
}

