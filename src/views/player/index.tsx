import { memo } from "react"
import type { FC, ReactNode } from "react"
import { PlayerLeft, PlayerRight, PlayerWrapper } from "./style"

interface IProps {
    children?: ReactNode
}

const Player: FC<IProps> = () => {
    return (
      <PlayerWrapper>
        <div className="content wrap-v2">
          <PlayerLeft>等待开发</PlayerLeft>
          <PlayerRight></PlayerRight>
        </div>
      </PlayerWrapper>
    )
}

export default memo(Player)