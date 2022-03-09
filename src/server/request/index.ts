import axios from 'axios'
import { h } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
interface JAxiosRequestInterceptor {
  //todo这个接口是为了让这个AxiosRequestConfig(axios里面对TS定义的接口)可以接受函数
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig //todo这个是axios里面的类型 如果不知道写void其实也可以
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}
interface JRequestConfig extends AxiosRequestConfig {
  //todo 继承原来接口
  interceptors?: JAxiosRequestInterceptor
  isLoading?: boolean
}
const URL_LOADING = true
class JRequest {
  instance: AxiosInstance
  interceptors?: JAxiosRequestInterceptor
  showLoading?: boolean
  LoadingService: any
  constructor(config: JRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.isLoading ?? URL_LOADING
    //todo 这个是让每个类的实例有自己的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //! 这个是让每个请求拦截器都有
    this.instance.interceptors.request.use(
      (config) => {
        //console.log('统一请求拦截')
        //todo 为什么要把这个值取出来 是因为我们还需要在下面的函数关闭这个loading
        //ele-plus文档也有说明
        if (this.showLoading) {
          this.LoadingService = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      // 请求失败，会经过这里
      function (error) {
        console.log('统一请求拦截失败')
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //  console.log(res, '响应')

        this.LoadingService?.close()

        //console.log('响应成功拦截')
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求错误')
        } else {
          return data
        }
      },
      function (err) {
        console.log('响应失败拦截')
        if (err.response.status === 404) {
          //todo h 函数是vue自带的可以自定义div结构
          ElMessage({
            message: h('p', null, [
              h('span', null, '请求'),
              h('i', { style: 'color: teal' }, '失败了')
            ])
          })
          //写法2 简单写法
          // ElMessage({
          //   message: 'Warning, this is a warning message.',
          //   type: 'warning',
          // })
        }
        return err
      }
    )
  }
  //todo 为什么这里还需要返回一个promise那因为这个是实例的一个方法request和我们之前封装的返回的request是不一样的
  //todo 这个request是我们自己手写的函数 函数里面有axios自带的request但是返回promise是需要我们自己写的这函数返回的
  request<T>(config: JRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      //todo 这个拦截相当于自己处理数据,而不是用axios里面的拦截器,但是也类似,就是接受单个接口的一个处理数据的函数
      //这个不能理解就算了  (感觉过度封装了)
      //!好像又可以理解了 请求是处理请求参数,响应是放在取到结果后的地方的
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.判断是否需要显示loading
      if (config.isLoading === false) {
        this.showLoading = config.isLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get<T>(config: JRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }
  post<T>(config: JRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'post' })
  }
  delete<T>(config: JRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' })
  }
  patch<T>(config: JRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'patch' })
  }
}

export default JRequest
