import { memo } from "react"
import type { FC, ReactNode } from "react"
import { LoginWrapper } from "./style"
import { shallowEqualApp, useAppSelector } from "@/store"

interface IProps {
    children?: ReactNode
}

const UserLogin: FC<IProps> = () => {
    const {username} = useAppSelector((state) => ({
        username: state.userInfo.username
    }), shallowEqualApp)
    return (
      <LoginWrapper className="sprite_02">
        <p className="desc">
          登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
        </p>
        {username === "" ? (
            <a href="#login" className="sprite_02">
                用户登录
            </a>
        ): (
            <span>{username}</span>
        )}
      </LoginWrapper>
    )
}

export default memo(UserLogin)