import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { LoginWrapper } from './style'
import { postLogin, postRegister } from '@/service'
import Cookies from 'js-cookie'

interface IProps {
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: () => void // 新增回调函数
}

const AppLogin: FC<IProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [page, setPage] = useState(true) // 默认登录页面
  const [message, setMessage] = useState('')

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      const response = await postLogin(username, password)
      if (response.data.success) {
        Cookies.set(
          'accessToken',
          JSON.stringify(response.data.data.accessToken),
          { expires: 7, path: '/' }
        )
        Cookies.set(
          'refreshToken',
          JSON.stringify(response.data.data.refreshToken),
          { expires: 7, path: '/' }
        )
        onClose()
        onLoginSuccess?.() // 调用登录成功回调
        setMessage('') // 清空错误信息
      } else {
        setMessage(response.data.message)
      }
    } catch (error) {
      setMessage('登陆失败') // 设置更具体的错误信息
    }
  }

  const handleRegister = async (e: any) => {
    e.preventDefault()

    if (password !== repassword) {
      setMessage('确认密码一致')
      return
    }

    try {
      const response = await postRegister(username, password)
      setMessage(response.data.message)
    } catch (error) {
      setMessage('注册失败') // 设置更具体的错误信息
    }
  }

  function handleSwitch() {
    setUsername('')
    setPassword('')
    setRepassword('')
    setMessage('')
    setPage(!page)
  }

  useEffect(() => {
    // 当Modal打开时，阻止背景滚动
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // 当组件卸载时，确保恢复背景滚动
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // 如果Modal不应该打开，则不渲染任何内容
  if (!isOpen) return null

  return (
    <LoginWrapper>
      <div className="modalContent">
        <h2>Login</h2>
        {message && <p className="error">{message}</p>}
        <form onSubmit={page ? handleLogin : handleRegister}>
          <div className="fromGroup">
            <label htmlFor="username">用户名:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="fromGroup">
            <label htmlFor="password">密码:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!page && (
            <div className="fromGroup">
              <label htmlFor="repassword">确认密码:</label>
              <input
                type="password"
                id="repassword"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit">{page ? 'Login' : 'Register'}</button>
          <button type="button" onClick={onClose} className="closeButton">
            Close
          </button>
          <button className="switchButton" onClick={handleSwitch}>
            {!page ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </LoginWrapper>
  )
}

export default memo(AppLogin)
