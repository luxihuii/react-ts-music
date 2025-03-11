import { memo, useRef, useState, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { Carousel } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import classNames from 'classnames'

import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import { shallowEqualApp, useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  // 定义内部数据
  const [currentIndex, setCurrentIndex] = useState(0)
  const bannerRef = useRef<CarouselRef>(null)

  // 从 redux 中获取数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  )

  const handleBeforeChange = useCallback((from: number, to: number) => {
    setCurrentIndex(to)
  }, [])

  const bgImage =
    banners?.length && banners[currentIndex].imageUrl + '?imageView&blur=40x20'

  return (
    <BannerWrapper
      style={{ background: `url(${bgImage}) center center / 6000px` }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            dots={false}
            effect="fade"
            ref={bannerRef}
            beforeChange={handleBeforeChange}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li
                  key={item.imageUrl}
                  onClick={() => {
                    bannerRef.current?.goTo(index)
                  }}
                >
                  <span
                    className={classNames('item', {
                      active: index === currentIndex
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight>
          <a href="https://music.163.com/#/download" target="_blank">
            下载客户端
          </a>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={() => bannerRef.current?.prev()}
          ></button>
          <button
            className="btn right"
            onClick={() => bannerRef.current?.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
