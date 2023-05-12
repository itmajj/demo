import axios from 'axios'
const server = axios.create({
    baseURL: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout: 5000,
    headers: {
        
    }
})
//请求拦截
server.interceptors.request.use(config => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || ''
    }
    return config;
},
    err => {
        Promise.reject(err);
    })
//响应拦截
server.interceptors.response.use((res) => {
    const status: number = res.status
    if (status == 200) {
        return res.data  
    }
    return Promise.reject(res.data)
}, err => {
    Promise.reject(err);
})
export default server   