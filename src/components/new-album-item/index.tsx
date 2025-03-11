import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AlbumItemWrapper } from './style'
import type { IAlbum } from '../../store/data-type'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: IAlbum
}

const NewAlbumItem: FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <AlbumItemWrapper className="sprite_02">
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 100)} alt="" />
        <a href="" className="cover sprite_cover"></a>
        <a href="" className="play sprite_icon"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </AlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)
