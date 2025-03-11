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

import '@/mockjs/index'

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
