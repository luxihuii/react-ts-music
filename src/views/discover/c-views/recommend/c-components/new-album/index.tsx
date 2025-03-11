import { memo, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Carousel } from 'antd'
import type { CarouselRef } from 'antd/es/carousel'
import { AlbumWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { shallowEqualApp, useAppSelector } from '@/store'
import NewAlbumItem from '@/components/new-album-item'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
    /** 定义内部数据 */
    const bannerRef = useRef<CarouselRef>(null)

    /** 从 redux 中获取数据 */
    const { newAlbums } = useAppSelector(
        (state) => ({
            newAlbums: state.recommend.newAlbums
        }),
        shallowEqualApp
    )

  /** 事件处理函数 */

  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={() => bannerRef.current?.prev()}
        ></button>
        <div className="banner">
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbums?.slice(item * 5, (item + 1) * 5).map((album) => {
                      return <NewAlbumItem key={album.id} itemData={album} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={() => bannerRef.current?.next()}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)
