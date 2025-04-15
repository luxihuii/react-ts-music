import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { LoginWrapper } from './style'
import { postLogin, postRegister } from '@/service'
import Cookies from 'js-cookie'
import DOMPurify from 'dompurify'
import { useAppDispatch } from '@/store'
import { changeCurrentUserInfoAction } from '@/store/userInfo'

interface IProps {
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: () => void // 新增回调函数
}

const AppLogin: FC<IProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [page, setPage] = useState(true) // 默认登录页面
  const [message, setMessage] = useState('')

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      const response = await postLogin(username, password)
      console.log(response)
      if (response.data.success) {
        // 存储 accessToken
        // localStorage.setItem(
        //   'accessToken',
        //   JSON.stringify(response.data.data.accessToken)
        // )
        Cookies.set(
          'refreshToken',
          JSON.stringify(response.data.data.refreshToken),
          { expires: 7, path: '/' }
        )
        onClose()
        onLoginSuccess?.() // 调用登录成功回调
        // 正确调用方式
        dispatch(
          changeCurrentUserInfoAction({
            username: username,
            accessToken: response.data.data.accessToken
          })
        )
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

    // 清理用户输入
    const sanitizedUsername = DOMPurify.sanitize(username)
    const sanitizedPassword = DOMPurify.sanitize(password)

    // 检查密码是否一致
    if (sanitizedPassword !== repassword) {
      setMessage('确认密码不一致')
      return
    }

    // 输入验证
    const usernamePattern = /^[a-zA-Z0-9_]{4,16}$/ // 用户名只允许字母、数字和下划线，长度 4-16
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{6,20}$/ // 密码允许字母、数字和特殊字符，长度 6-20

    if (!usernamePattern.test(sanitizedUsername)) {
      setMessage('用户名只能包含字母、数字和下划线，且长度为 4-16 个字符')
      return
    }

    if (!passwordPattern.test(sanitizedPassword)) {
      setMessage('密码只能包含字母、数字和特殊字符，且长度为 6-20 个字符')
      return
    }

    try {
      const response = await postRegister(sanitizedUsername, sanitizedPassword)
      setMessage(response.data.message)
    } catch (error) {
      setMessage('注册失败')
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
