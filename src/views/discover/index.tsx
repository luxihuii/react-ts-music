import { memo, Suspense } from "react"
import type { FC, ReactNode } from "react"
import { Outlet } from "react-router-dom"

import NavBar from '@/views/discover/c-components/nav-bar'

interface IProps {
    children?: ReactNode
}

const Discover: FC<IProps> = () => {
    return (
      <div>
        <NavBar />
        <Suspense fallback="">
          <Outlet /> {/* 用于嵌套路由渲染，显示当前路由的子路由的组件 */}
        </Suspense>
      </div>
    )
}

export default memo(Discover)