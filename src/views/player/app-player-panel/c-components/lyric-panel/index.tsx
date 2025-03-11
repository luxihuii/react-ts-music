import { memo, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { LyricPanelWrapper } from './style'
import classNames from 'classnames'
import { shallowEqualApp, useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

const LyricPanel: FC<IProps> = () => {
  /** 从Redux中获取数据 */
  const { lyrics, lyricIndex } = useAppSelector(
    (state) => ({
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex
    }),
    shallowEqualApp
  )

  function scrollTo(element: any, to: number, duration: number) {
    if (duration <= 0) return
    // scrollTop 是一个DOM属性，用于表示当前元素内容向上滚动的距离，即元素内容顶部与元素可视区域顶部之间的距离。这个属性可读可写，单位是像素。
    // scrollTop属性只适用于具有滚动条的元素（即overflow属性设置为auto或scroll的元素）
    let difference = to - element.scrollTop // 计算当前滚动位置与目标位置之间的差异
    // 计算每ms需要滚动的像素，每10ms滚动一次
    let perTick = (difference / duration) * 10

    // 在每一帧执行滚动
    const tick = () => {
      // 更新元素滚动位置
      element.scrollTop = element.scrollTop + perTick
      if (element.scrollTop === to) return
      scrollTo(element, to, duration - 10)
    }

    requestAnimationFrame(tick)
  }

  const lyricPanelRef = useRef(null)
  const lyricHeight = 32
  useEffect(() => {
    if (lyricIndex > 0 && lyricIndex < 3) return
    // 传入歌词面板dom元素，计算目标滚动位置，滚动动画持续时间
    scrollTo(lyricPanelRef.current, (lyricIndex - 3) * lyricHeight, 300)
  }, [lyricIndex])

  return (
    <LyricPanelWrapper ref={lyricPanelRef}>
        <div className="lrc-content">
          {lyrics?.map((item, index) => {
            return (
              <div
                key={item.time}
                className={classNames('lrc-item', {
                  active: index === lyricIndex
                })}
              >
                {item.content}
              </div>
            )
          })}
        </div>
    </LyricPanelWrapper>
  )
}

export default memo(LyricPanel)
