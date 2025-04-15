import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'
import { IPlayList, ISong } from '@/store/data-type'
import { getImageSize } from '@/utils/format'
import { NavLink } from 'react-router-dom'
import { fetchCurrentSongAction } from '@/views/player/store/player'
import { useAppDispatch } from '@/store'

interface IProps {
  children?: ReactNode
  itemRankingData: ISong[]
  itemPlayListData: IPlayList
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemRankingData, itemPlayListData } = props

  const dispatch = useAppDispatch()
  function handlePlayClick(id: any) {
    dispatch(fetchCurrentSongAction(id))
  }

  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemPlayListData?.coverImgUrl, 80)} alt="" />
          <a href="" className="cover sprite_cover">
            {itemPlayListData?.name}
          </a>
        </div>
        <div className="info">
          <div className="name">{itemPlayListData?.name}</div>
          <div>
            <div className="sprite_02 btn play"></div>
            <div className="sprite_02 btn favor"></div>
          </div>
        </div>
      </div>
      <div className="list">
        {itemRankingData.map((item, index) => {
          return (
            <div className="item" key={item.id}>
              <div className="rank">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  <button className="btn sprite_02 play" onClick={() => handlePlayClick(item.id)}></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <NavLink to="/discover/ranking">查看全部&gt;</NavLink>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)
