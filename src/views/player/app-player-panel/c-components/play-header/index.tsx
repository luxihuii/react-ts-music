import { memo } from "react"
import type { FC, ReactNode } from "react"
import { HeaderLeft, HeaderRight, PlayHeaderWrapper } from "./style"
import { shallowEqualApp, useAppDispatch, useAppSelector } from "@/store"
import { removeListMusicAction } from "@/views/player/store/player"

interface IProps {
    children?: ReactNode
}

const PlayHeader: FC<IProps> = () => {
  /** 从Redux中获取数据 */
  const { currentSong, playSongList } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      playSongList: state.player.playSongList
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()

    return (
      <PlayHeaderWrapper>
        <HeaderLeft>
          <h3>播放列表({playSongList.length})</h3>
          <div className="operator">
            <button>
              <i className="sprite_playlist icon favor"></i>
              收藏全部
            </button>
            <span className="line"></span>
            <button onClick={() => dispatch(removeListMusicAction())}>
              <i className="sprite_playlist icon remove"></i>
              清除
            </button>
          </div>
        </HeaderLeft>
        <HeaderRight>{currentSong?.name}</HeaderRight>
      </PlayHeaderWrapper>
    )
}

export default memo(PlayHeader)