type FetchFunction<T extends any[], R> = (...args: T) => Promise<R>

function fetchTimeout<T>(promise: Promise<T>, time: number): Promise<T> {
  let timeoutHandle: NodeJS.Timeout
  // 创建一个 timeoutPromise，在 time 毫秒后抛出超时错误
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutHandle = setTimeout(() => {
      reject(new Error('Request timed out'))
    }, time)
  })
  // 使用 Promise.race 将传入的 promise 和 timeoutPromise 进行竞争：
  // 如果 promise 先完成，则返回 promise 的结果
  // 如果 timeoutPromise 先完成，则抛出超时错误
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutHandle)
  })
}

// 高阶函数，用于添加超时和重试逻辑
export function withRetryAndTimeout<T extends any[], R>(
  fn: FetchFunction<T, R>,
  retries = 3,
  timeout = 5000
): FetchFunction<T, R> {
  return async function (...args: T): Promise<R> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetchTimeout(fn(...args), timeout)
        return response // 请求成功，返回响应
      } catch (error: any) {
        console.warn(`${fn.name} Attempt ${i + 1} failed:`, error.message)
        if (i === retries - 1) throw error // 达到重试次数，抛出错误

        // 指数退避
        await new Promise((resolve) => setTimeout(resolve, timeout * 2 ** i))
      }
    }
    throw new Error('Unexpected error: retries exhausted')
  }
}

export function showErrorAlert(message: string) {
  alert(message)
}

// // 降级处理
// async function fetchWithFallback(url, fallbackData = [], retries = 3) {
//   try {
//     return await fetchWithExponentialBackoff(url, retries)
//   } catch (error) {
//     console.error('Request failed, returning fallback data.')
//     return fallbackData
//   }
// }

// // 实现熔断器
// class CircuitBreaker {
//   constructor(failureThreshold = 3, resetTimeout = 5000) {
//     this.failureCount = 0
//     this.failureThreshold = failureThreshold
//     this.resetTimeout = resetTimeout
//     this.lastFailureTime = null
//   }

//   async request(fn) {
//     if (this.failureCount >= this.failureThreshold) {
//       const timeSinceLastFailure = Date.now() - this.lastFailureTime
//       if (timeSinceLastFailure < this.resetTimeout) {
//         throw new Error('Circuit breaker is open. Request blocked.')
//       } else {
//         this.failureCount = 0 // 恢复请求
//       }
//     }

//     try {
//       const result = await fn()
//       this.failureCount = 0 // 请求成功，重置失败计数
//       return result
//     } catch (error) {
//       this.failureCount++
//       this.lastFailureTime = Date.now()
//       throw error
//     }
//   }
// }
