import _axios from 'axios'
import config from '@/config/config'
import { ElMessage } from 'element-plus'
import { getToken, setToken } from '@/common/utils/TokenUtil'
import router,{ LOGIN_PAGE_NAME } from '@/router'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
class HttpRequest {
    constructor(baseUrl = baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
            }
        }
        return config
    }
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            const _token = getToken()
            if (_token) config.headers.Authorization = 'Bearer ' + _token
            return config
        }, error => {
            return Promise.reject(error)
        })

        // 响应拦截
        instance.interceptors.response.use(res => {
            const { data } = res
            if (data.code === 0) {
                return data
            } else if (data.code === -1) {
                if (data.msg && data.msg != '') {
                    ElMessage.error({
                        message: data.msg,
                        duration: 3500
                    })
                }
                return Promise.reject(data)
            } else if (url.indexOf('/oauth/token') !== -1) {
                return data;
            } else {
                return Promise.reject(data)
            }
        }, error => {
            const { status, data } = error.response
            if (status === 401) {
                ElMessage.warning({
                    message: '您当前的会话已超时，请重新登录',
                    duration: 4000
                });
                setToken("", 0);
                console.log(router)
                router.replace({ name: LOGIN_PAGE_NAME });
            } else {
				ElMessage.error('服务器连接失败！')
			}
            return Promise.reject(data)
        })
    }
    request(options) {
        const instance = _axios.create();
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options);
    }
}

const axios = new HttpRequest(baseUrl)

export default axios


