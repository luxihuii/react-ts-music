import { http, HttpResponse } from 'msw'
import crypto from 'crypto-js'
import { login, saveLoginData } from './login'
import { refresh } from 'less'

const secret =
  '39dff3452ff0b790c2c3e7bf3550abb160a3fe4e7917f1bfcb43801f8d070ad5'

// 统一的 API 响应格式
const apiResponse = (status, success, message, data = null) => {
  return HttpResponse.json(
    {
      code: status,
      success,
      message,
      data
    },
    { status }
  )
}

// 处理登录请求
const handleLogin = async ({ request }) => {
  const { username, password } = await request.json()

  if (!login.has(username)) {
    return apiResponse(200, false, '用户不存在')
  }

  if (login.get(username) !== password) {
    return apiResponse(200, false, '密码错误')
  }

  const currentTime = Math.floor(Date.now() / 1000)
  const accessTokenTmp = { username, exp: currentTime + 3600 }
  const refreshTokenTmp = { username, exp: currentTime + 3600 * 24 * 7 }

  return apiResponse(200, true, '登录成功', {
    accessToken: {
      token: accessTokenTmp,
      signature: crypto
        .HmacSHA256(JSON.stringify(accessTokenTmp), secret)
        .toString()
    },
    refreshToken: {
      token: refreshTokenTmp,
      signature: crypto
        .HmacSHA256(JSON.stringify(refreshTokenTmp), secret)
        .toString()
    }
  })
}

// 处理注册请求
const handleRegister = async ({ request }) => {
  const { username, password } = await request.json()

  if (login.has(username)) {
    return apiResponse(200, false, '用户已存在')
  }

  login.set(username, password)
  saveLoginData()
  return apiResponse(200, true, '注册成功')
}

// 验证 Token 请求
const handleVerifyToken = async ({ request }) => {
  try {
    const { accessToken } = await request.json()
    const { token, signature } = accessToken

    const expectedSignature = crypto
      .HmacSHA256(JSON.stringify(token), secret)
      .toString()
    if (signature !== expectedSignature) {
      throw new Error('Invalid token signature')
    }

    if (token.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired')
    }

    return apiResponse(200, true, 'Token 验证成功', {
      username: token.username
    })
  } catch (error) {
    return apiResponse(401, false, 'Token 验证失败: ' + error.message)
  }
}

// 刷新 Token 请求
const handleRefreshToken = async ({ request }) => {
  try {
    const { refreshToken } = await request.json()
    const { token, signature } = refreshToken

    const expectedSignature = crypto
      .HmacSHA256(JSON.stringify(token), secret)
      .toString()
    if (signature !== expectedSignature) {
      throw new Error('Invalid refresh token signature')
    }

    if (token.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Refresh token expired')
    }

    const currentTime = Math.floor(Date.now() / 1000)
    const username = token.username
    const newAccessToken = { username, exp: currentTime + 3600 }
    const newRefreshToken = { username, exp: currentTime + 3600 * 24 * 7 }

    return apiResponse(200, true, '刷新成功', {
      accessToken: {
        token: newAccessToken,
        signature: crypto
          .HmacSHA256(JSON.stringify(newAccessToken), secret)
          .toString()
      },
      refreshToken: {
        token: newRefreshToken,
        signature: crypto
          .HmacSHA256(JSON.stringify(newRefreshToken), secret)
          .toString()
      }
    })
  } catch (error) {
    return apiResponse(401, false, '刷新 token 失败: ' + error.message)
  }
}

// 请求处理器
export const handlers = [
  http.post('/user/login', handleLogin),
  http.post('/user/register', handleRegister),
  http.post('/user/verifyToken', handleVerifyToken),
  http.post('/user/refreshToken', handleRefreshToken)
]
