import axios from 'axios'
const server = axios.create({
    baseURL: 'http://127.0.0.1:4523/m1/5922937-5610011-default',
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