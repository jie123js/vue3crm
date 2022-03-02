import { BASE_URL, TIME_OUT } from './request/config'
import JRequest from './request'
//todo这一步封装是为了防止有多个基准路径,有多个你new多个实例就可以了
const jRequest = new JRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: function (config) {
      console.log('请求拦截器')
      return config
    },
    responseInterceptor: function (res) {
      console.log('响应拦截器')
      return res
    }
  }
})

export default jRequest
