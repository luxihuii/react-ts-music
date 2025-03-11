import { login, saveLoginData } from './login'

import Mock from 'mockjs'
import crypto from 'crypto-js'

const secret =
  '39dff3452ff0b790c2c3e7bf3550abb160a3fe4e7917f1bfcb43801f8d070ad5'

Mock.mock('http://localhost:3000/user/login', 'post', (options) => {
  // 解析请求体
  const { username, password } = JSON.parse(options.body)

  // 模拟登录逻辑
  if (login.has(username)) {
    const currentTime = Math.floor(Date.now() / 1000)
    if (login.get(username) === password) {
      const accessTokenTmp = {
        username: username,
        exp: currentTime + 3600 // 1h
        // exp: currentTime + 120
      }
      const refreshTokenTmp = {
        username: username,
        exp: currentTime + 3600 * 24 * 7 // 7d
        // exp: currentTime + 120 * 5
      }
      return Mock.mock({
        code: 200,
        success: true,
        message: '登录成功',
        data: {
          accessToken: {
            accessTokenTmp,
            signature: crypto.HmacSHA256(JSON.stringify(accessTokenTmp), secret).toString()
          },
          refreshToken: {
            refreshTokenTmp,
            signature: crypto.HmacSHA256(JSON.stringify(refreshTokenTmp), secret).toString()
          }
        }
      })
    } else {
      return Mock.mock({
        code: 200,
        success: false,
        message: '密码错误',
        data: null
      })
    }
  } else {
    return Mock.mock({
      code: 200,
      success: false,
      message: '用户不存在',
      data: null
    })
  }
})

Mock.mock('http://localhost:3000/user/register', 'post', (options) => {
  // 解析请求体
  const { username, password } = JSON.parse(options.body)

  // 模拟注册逻辑
  if (login.has(username)) {
    return Mock.mock({
      code: 200,
      success: false,
      message: '用户已存在'
    })
  } else {
    login.set(username, password)
    saveLoginData()
    return Mock.mock({
      code: 200,
      success: true,
      message: '注册成功'
    })
  }
})

// 模拟验证 Token
Mock.mock('http://localhost:3000/user/verifyToken', 'post', (options) => {
  const { accessToken } = JSON.parse(options.body)

  try {
    // 验证 Token 是否有效
    const { accessTokenTmp, signature } = accessToken // 获取用户名或其他信息
    if (
      signature !==
      crypto.HmacSHA256(JSON.stringify(accessTokenTmp), secret).toString()
    ) {
      throw new Error('验证失败，不正确，错误')
    }

    return Mock.mock({
      code: 200,
      success: true,
      message: 'Token 验证成功',
      data: null
    })
  } catch (error) {
    return Mock.mock({
      code: 401,
      success: false,
      message: 'Token 验证失败',
      data: null
    })
  }
})

// 模拟刷新 token 接口
Mock.mock('http://localhost:3000/api/refresh-token', 'post', (options) => {
  const { refreshToken } = JSON.parse(options.body)

  if (refreshToken) {
    try {
      // 验证 refreshToken 是否有效
      const { refreshTokenTmp, signature } = refreshToken // 获取用户名或其他信息
      if (signature !== crypto.HmacSHA256(JSON.stringify(refreshTokenTmp), secret).toString()) {
        throw new Error('')
      }

      const currentTime = Math.floor(Date.now() / 1000)
      const username = tokenTmp.username
      // 如果 refreshToken 有效，则可以生成新的 accessToken 和 refreshToken
      const newAccessTokenTmp = {
        username: username,
        exp: currentTime + 3600 // 1h
        // exp: currentTime + 120
      }
      const newRefreshTokenTmp = {
        username: username,
        exp: currentTime + 3600 * 24 * 7 // 7d
        // exp: currentTime + 120 * 5
      }
      return Mock.mock({
        code: 200,
        message: '刷新成功',
        data: {
          accessToken: {
            accessTokenTmp: newAccessTokenTmp,
            signature: crypto.HmacSHA256(newAccessTokenTmp, secret).toString()
          },
          refreshToken: {
            refreshTokenTmp: newRefreshTokenTmp,
            signature: crypto.HmacSHA256(newRefreshTokenTmp, secret).toString()
          }
        }
      })
    } catch (error) {
      // 如果 refreshToken 无效或过期
      return Mock.mock({
        code: 401,
        message: '刷新 token 失败，token 无效或已过期'
      })
    }
  } else {
    return Mock.mock({
      code: 400,
      message: '请求参数错误，未提供 refreshToken'
    })
  }
})
