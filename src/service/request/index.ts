import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { HYRequestConfig } from './type'

class HYRequest {
  instance: AxiosInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 自定义的请求拦截
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors?.requestSuccessFn,
        config.interceptors?.requestFailureFn
      )
      // 自定义的响应拦截
      this.instance.interceptors.response.use(
        config.interceptors?.responseSuccessFn,
        config.interceptors?.responseFailureFn
      )
    }
    // this.instance.interceptors.response.use(
    //   config.interceptors?.responseSuccessFn,
    //   config.interceptors?.responseFailureFn
    // )
  }

  request<T = any>(config: HYRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as InternalAxiosRequestConfig)
    }

    // console.log('请求配置:', config) // 打印请求配置，包括请求头

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          if (config.interceptors?.responseFailureFn) {
            err = config.interceptors.responseFailureFn(err)
          }
          reject(err)
        })
    })
  }

//   request<T = any>(config: HYRequestConfig<T>) {
//     if (config.interceptors?.requestSuccessFn) {
//       config = config.interceptors.requestSuccessFn(
//         config as InternalAxiosRequestConfig
//       )
//     }

    // return new Promise<T>((reslove, reject) => {
    //   this.instance
    //     .request<any, T>(config)
    //     .then((res) => {
    //       if (config.interceptors?.responseSuccessFn) {
    //         res = config.interceptors.responseSuccessFn(res)
    //       }
    //       reslove(res)
    //     })
    //     .catch((err) => {
    //       reject(err)
    //     })
    // })
//   }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest