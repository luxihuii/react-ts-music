import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'normalize.css'
import '@ant-design/v5-patch-for-react-19'

import './assets/css/index.less'

import App from '@/App.tsx'
import store from './store'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/assets/theme'
import ErrorBoundary from './service/error-handle/error-boundary'

// import '@/mockjs/index'
import { worker } from '@/mockjs/browser' // 导入 worker

// then() 确保了 worker.start() 异步启动完成后再渲染应用，这样避免了可能的网络请求问题
// 如果直接渲染应用而不等待 worker.start()，那么模拟的 API 可能无法正确拦截请求
if (process.env.NODE_ENV === 'development') {
  worker.start().then(() => {
    createRoot(document.getElementById('root')!).render(
      //   <StrictMode>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <HashRouter>
              <App />
            </HashRouter>
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
      //   </StrictMode>
    )
  })
}
