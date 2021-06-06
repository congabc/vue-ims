import axios from 'axios'


// 创建axios实例对象
const request = axios.create({
    baseURL:'https://www.fastmock.site/mock/46bca416bdb6efa19d9b4244a8cc3d4a/dev-api',
    timeout:5000
});
// 创建拦截对象
// 请求拦截器
request.interceptors.request.use(config => {
    return config
},error => {
    return Promise.reject(error)

})
// 响应拦截器
request.interceptors.response.use(response => {
    console.log(response)
    return response.data
},error => {
    return Promise.reject(error)

})
export default request