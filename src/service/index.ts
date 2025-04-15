import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'

// 全局配置
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default hyRequest

export function postLogin(username: string, password: string) {
  return hyRequest.post({
    url: 'http://localhost:3000/user/login',
    data: {
      username,
      password
    }
  })
}

export function postRegister(username: string, password: string) {
  return hyRequest.post({
    url: 'http://localhost:3000/user/register',
    data: {
      username,
      password
    }
  })
}

// export function postVerifyToken(accessToken: string) {
//   return hyRequest.post({
//     url: 'http://localhost:3000/user/verifyToken',
//     // headers: {
//     //   Authorization: `Bearer ${accessToken}`
//     // },
//     data: {
//       accessToken
//     }
//   })
// }

// export function postRefreshToken(refreshToken: string) {
//   return hyRequest.post({
//     url: 'http://localhost:3000/api/refresh-token',
//     // headers: {
//     //   Authorization: `Bearer ${refreshToken}`
//     // }
//     data: {
//       refreshToken
//     }
//   })
// }

export function postVerifyToken(accessToken: string) {
  return hyRequest.post({
    url: 'http://localhost:3000/user/verifyToken',
    // headers: {
    //   Authorization: `Bearer ${accessToken}`
    // },
    data: {
        accessToken
    }
  })
}

export function postRefreshToken(refreshToken: string) {
  return hyRequest.post({
    url: 'http://localhost:3000/user/refreshToken',
    // headers: {
    //   Authorization: `Bearer ${refreshToken}`
    // }
    data: {
        refreshToken
    }
  })
}

export function getSearch(keywords: string) {
    return hyRequest.get({
        url: '/search',
        params: {
            keywords
        }
    })
}