import { setupWorker } from 'msw/browser'
import { handlers } from './handlers' // 导入你的请求处理器

// 初始化 MSW worker
export const worker = setupWorker(...handlers) // 这里的 handlers 是你定义
