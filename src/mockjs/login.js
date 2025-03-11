// 从 localStorage 读取数据，如果没有就用默认值
const storedLogin = localStorage.getItem('login')
export const login = new Map(
  storedLogin
    ? JSON.parse(storedLogin)
    : [
        ['luxihui', 'lxh2001'],
        ['admin', '123456']
      ]
)

// 封装一个函数，用于存储 login 数据
export const saveLoginData = () => {
  localStorage.setItem('login', JSON.stringify(Array.from(login.entries())))
}