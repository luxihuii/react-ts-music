// ErrorBoundary.tsx
import React, { ReactNode } from 'react'
import { styled } from 'styled-components'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo)
  }

  handleRetry = () => {
    // 这里实现重试逻辑，例如重新加载页面
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
              <h1>哎呀，出错了！</h1>
              <h2>我们遇到了一些问题，请稍后重试。</h2>
              <button onClick={this.handleRetry}>重试</button>
        </ErrorWrapper>
      )
    }

    return this.props.children
  }
}

const ErrorWrapper = styled.div`
  position: relative;
  background-color: #eee;
  text-align: center;
  line-height: 50px;
  padding: 70px;

  button {
    width: 100px;
    height: 40px;
    background-color: white;
    border-radius: 10px;
    font-size: 14px;

    &:hover {
      background-color: rgb(228, 160, 137);
    }
  }
`
export default ErrorBoundary