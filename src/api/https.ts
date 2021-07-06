import axios from "axios"
import config from "@/api/config"

const instance = axios.create({
  baseURL: config.baseUrl.dev,
  timeout: 6000,
})

instance.interceptors.response.use(
  response => {
    //拦截响应，做统一处理
    return response
  },
  error => {
    return Promise.reject(error.message) // 返回接口返回的错误信息
  })

//get请求
export function get(url: any, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
