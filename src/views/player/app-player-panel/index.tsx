import { memo } from "react"
import type { FC, ReactNode } from "react"
import { PlayerPanelWrapper } from "./style"
import PlayList from "./c-components/play-list"
import LyricPanel from "./c-components/lyric-panel"
import PlayHeader from "./c-components/play-header"

interface IProps {
    children?: ReactNode
}

const AppPlayPanel: FC<IProps> = () => {
    return (
      <PlayerPanelWrapper>
        <PlayHeader />
        <div className="main">
          <PlayList />
          <LyricPanel />
        </div>
      </PlayerPanelWrapper>
    )
}

export default memo(AppPlayPanel)