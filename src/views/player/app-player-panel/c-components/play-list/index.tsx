import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { formatTime } from '@/utils/handle-player'
import classNames from 'classnames'
import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayListWrapper } from './style'
import { removeMusicAction, selectMusicAction } from '@/views/player/store/player'

interface IProps {
  children?: ReactNode
}

const PlayList: FC<IProps> = () => {
  /** 从Redux中获取数据 */
  const { playSongList, playSongIndex } = useAppSelector(
    (state) => ({
      playSongList: state.player.playSongList,
      playSongIndex: state.player.playSongIndex
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()

  return (
    <PlayListWrapper>
      {playSongList.map((item, index) => {
        return (
          <div
            key={item.id}
            className={classNames('play-item', {
              active: playSongIndex === index
            })}
            onClick={() => dispatch(selectMusicAction(index))}
          >
            <div className="left">{item.name}</div>
            <div className="operator">
              <button>
                <i className="sprite_playlist icon favor">收藏</i>
              </button>
              <button>
                <i className="sprite_playlist icon share">下载</i>
              </button>
              <button>
                <i className="sprite_playlist icon download">分享</i>
              </button>
              <button>
                <i
                  className="sprite_playlist icon remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeMusicAction(index));
                  }}
                >
                  删除
                </i>
              </button>
            </div>
            <div className="right">
              <span className="singer">{item?.ar?.[0].name}</span>
              <span className="duration">{formatTime(item?.dt)}</span>
              <span className="sprite_playlist link"></span>
            </div>
          </div>
        )
      })}
    </PlayListWrapper>
  )
}

export default memo(PlayList)
