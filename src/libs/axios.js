import axios from 'axios'
import { getToken, setToken } from '@/libs/utils'
import router from '../router'
// import { Spin } from 'iview'
class HttpRequest {
  constructor (baseURL) {
    this.baseUrl = baseURL
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      timeout: 5000,
      headers: {
        token: getToken()
      }
    }
    return config
  }
  distroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.distroy(url)
      if (error.response.status === 403) {
        setToken('')
        router.push({
          name: 'login'
        })
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
