import { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { NavLink } from 'react-router-dom'
import { Slider, message } from 'antd'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { getImageSize } from '@/utils/format'
import { formatTime } from '@/utils/handle-player'
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayModeAction
} from '../store/player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  /** 组件内部定义的数据 */
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false) // 是否拖拽
  const audioRef = useRef<HTMLAudioElement>(null)

  /** 从Redux中获取数据 */
  const { currentSong, lyrics, lyricsIndex, playMode, mp3 } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricsIndex: state.player.lyricIndex,
      playMode: state.player.playMode,
      mp3: state.player.mp3
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()

  /** 组件内的副作用操作 */
  useEffect(() => {
    // 1.播放音乐源
    audioRef.current!.src = mp3

    // 2.如果音乐需要播放
    if (isPlaying && audioRef.current) {
      audioRef.current.addEventListener(
        'canplay',
        () => {
          audioRef.current
            ?.play()
            .then(() => {
              // 播放成功，更新状态
              console.log('播放成功')
              setIsPlaying(true)
            })
            .catch((error) => {
              // 播放失败，打印错误并更新状态
              console.error('播放失败', error)
              setIsPlaying(false)
            })
        }
      )
    }

    // 2.获取音乐总时长
    setDuration(currentSong.dt)
  }, [currentSong])

  /** 音乐播放的进度处理 */
  function handleTimeUpdate() {
    // 1.获取当前播放时间
    // 单位转换成ms * 1000
    const currentTime = audioRef.current!.currentTime * 1000

    // 2.计算当前歌曲进度
    // 表示进度条 * 100
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    // 3.根据当前时间匹配对应歌词
    let left = -1,
      right = lyrics.length - 1
    while (left + 1 < right) {
      let middle = Math.floor((left + right) / 2)
      if (lyrics[middle].time > currentTime) {
        right = middle
      } else {
        left = middle
      }
    }

    // 4.匹配上对应歌词的索引
    if (lyricsIndex === left || left === -1) return
    dispatch(changeLyricIndexAction(left))

    // 5.展示对应歌词
    message.open({
      content: lyrics[left].content,
      key: 'lyric',
      duration: 0
    })
  }

  function handleTimeEnded() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
    }
  }

  /** 组件内部事件处理 */
  function handlePlayBtnClick() {
    const isPaused = audioRef.current!.paused
    isPaused
      ? audioRef.current?.play().catch(() => setIsPlaying(false))
      : audioRef.current?.pause()
    setIsPlaying(isPaused)
  }

  function handleChangeMusic(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }

  function handleChangePlayMode() {
    const newPlayMode = (playMode + 1) % 3
    dispatch(changePlayModeAction(newPlayMode))
  }

  function handleSliderChanged(value: number) {
    // 获取点击位置的时间
    const currentTime = (value / 100) * duration

    // 设置当前播放时间
    audioRef.current!.currentTime = currentTime / 1000

    // 设置currentTime和progress
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  function handleSliderChanging(value: number) {
    // 处于拖拽状态
    setIsSliding(true)

    // 设置progress
    setProgress(value)

    // 获取value对应位置的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content">
        <BarControl isplaying={isPlaying.toString()}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleChangeMusic(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleChangeMusic(true)}
          ></button>
        </BarControl>
        <BarPlayerInfo>
          <NavLink to="/player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl, 34)}
              alt=""
            />
          </NavLink>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/** Slider组件 */}
              <Slider
                step={0.5}
                tooltip={{ formatter: null }}
                value={progress}
                onChangeComplete={handleSliderChanged}
                onChange={handleSliderChanging}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider"></span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playmode={playMode}>
          <div className="left">
            <div className="btn pip"></div>
            <div className="btn sprite_playbar favor"></div>
            <div className="btn sprite_playbar share"></div>
          </div>
          <div className="right sprite_playbar">
            <div className="btn sprite_playbar volume"></div>
            <div
              className="btn sprite_playbar loop"
              onClick={handleChangePlayMode}
            ></div>
            <div className="btn sprite_playbar playlist"></div>
            <div className="btn quality"></div>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      />
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
