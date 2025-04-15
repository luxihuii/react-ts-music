import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'

import headerTitles from '@/assets/data/header_titles.json'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AppLogin from '../app-login'
import { postRefreshToken, postVerifyToken } from '@/service'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAppDispatch } from '@/store'
import { changeCurrentUserInfoAction } from '@/store/userInfo'

interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 登录状态
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  // 组件加载时检查cookie中的token
  useEffect(() => {
    const refreshTokenString = Cookies.get('refreshToken')
    const accessTokenString = localStorage.getItem('accessToken')

    let accessToken: any
    let refreshToken: any
    if (accessTokenString && refreshTokenString) {
      accessToken = JSON.parse(accessTokenString)
      refreshToken = JSON.parse(refreshTokenString)
    } else {
      return
    }

    const currentTime = Math.floor(Date.now() / 1000) // 获取当前时间（秒）

    if (!accessToken || !refreshToken) {
      setIsLoggedIn(false)
      return
    }
    // 存在
    let timer: NodeJS.Timeout
    if (accessToken.token.exp > currentTime) {
      // accessToken 未过期，验证是否有效
      verifyToken(accessToken)
      setIsLoggedIn(true)

      // 设置定时器，在accessToken接近过期时尝试刷新
      const timeout =
        accessToken.token.exp * 1000 - new Date().getTime() - 60000
      timer = setTimeout(() => {
        refreshAccessToken(refreshToken)
      }, timeout)
    } else if (refreshToken) {
      // accessToken 过期
      if (refreshToken.token.exp > currentTime) {
        // refreshToken 未过期
        refreshAccessToken(refreshToken)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // 处理登录成功后的逻辑
  const handleLoginSuccess = () => {
    setIsLoggedIn(true) // 设置登录状态为true
    setShowLogin(false) // 关闭登录模态框
  }

  // 处理退出登录
  const handleLogout = () => {
    Cookies.remove('refreshToken')
    localStorage.removeItem('accessToken')
    setIsLoggedIn(false) // 设置登录状态为false
    dispatch(changeCurrentUserInfoAction(""))
  }

  // 模拟验证 accessToken
  const verifyToken = async (accessToken: string) => {
    try {
      const response = await postVerifyToken(accessToken)
      if (response.data.code === 200) {
        console.log()
        // 验证成功
        setIsLoggedIn(true)
        dispatch(changeCurrentUserInfoAction(response.data.username))
      } else {
        // 验证失败，执行相关逻辑（如移除 token、重新登录等）
        localStorage.removeItem('accessToken')
        Cookies.remove('refreshToken')
        setIsLoggedIn(false)
        dispatch(changeCurrentUserInfoAction(''))
        console.log('会话已过期，将显示提示信息')
        alert('会话已过期，请重新登录')
      }
    } catch (error) {
      console.error('Token 验证失败:', error)
      Cookies.remove('refreshToken')
      localStorage.removeItem('accessToken')
      setIsLoggedIn(false)
      dispatch(changeCurrentUserInfoAction(''))
      console.log('发生错误，将显示提示信息')
      alert('发生错误，请重新登录')
    }
  }

  // 模拟刷新 accessToken
  const refreshAccessToken = async (refreshToken: string) => {
    if (!refreshToken) {
      setIsLoggedIn(false)
      return
    }

    try {
      const response = await postRefreshToken(refreshToken)
      if (response.data.code === 200) {
        localStorage.setItem(
          'accessToken',
          JSON.stringify(response.data.data.accessToken)
        )
        Cookies.set(
          'refreshToken',
          JSON.stringify(response.data.data.refreshToken),
          { expires: 7, path: '/' }
        )
        setIsLoggedIn(true)
      } else {
        Cookies.remove('refreshToken')
        localStorage.removeItem('accessToken')
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.error('刷新 token 失败:', error)
      Cookies.remove('refreshToken')
      localStorage.removeItem('accessToken')
      setIsLoggedIn(false)
    }
  }

  // 处理搜索
  const handleSearch = (value: string) => {
    if (value !== '') {
      navigate(`/search?query=${encodeURIComponent(value)}`)
    }
  }

  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      )
    }
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/#">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={(e) =>
              handleSearch((e.target as HTMLInputElement).value)
            }
          />
          <span className="center">创作者中心</span>
          {isLoggedIn ? (
            <>
              <span className="logout" onClick={handleLogout}>
                退出
              </span>
            </>
          ) : (
            <span className="login" onClick={() => setShowLogin(true)}>
              登录
            </span>
          )}
        </HeaderRight>
      </div>
      <div className="divider"></div>
      {showLogin && (
        <AppLogin
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
