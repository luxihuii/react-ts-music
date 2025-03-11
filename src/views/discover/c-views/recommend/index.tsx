import { useAppDispatch } from "@/store"
import { memo, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { fetchRankingDataAction, fetchRecommendDataAction } from "./store/recommend"
import TopBanner from './c-components/top-banner'
import { RecommendWrapper } from "./style"
import HotRecommend from "./c-components/hot-recommend"
import NewAlbum from "./c-components/new-album"
import TopRanking from "./c-components/top-ranking"
import UserLogin from "./c-components/user-login"
import vip_card from '@/assets/img/dis_vip_card.png'
import SettleSinger from "./c-components/settle-singer"
import HotAnchor from "./c-components/hot-anchor"

interface IProps {
    children?: ReactNode
}

const Recommend: FC<IProps> = () => {
    // 发起 action 获取数据
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchRecommendDataAction())
        dispatch(fetchRankingDataAction())
    }, [])

    return (
      <RecommendWrapper>
        <TopBanner />
        <div className="content wrap-v2">
          <div className="left">
            <HotRecommend />
            <NewAlbum />
            <TopRanking />
          </div>
          <div className="right">
            <img src={vip_card} alt="" />
            <UserLogin />
            <SettleSinger />
            <HotAnchor />
          </div>
        </div>
      </RecommendWrapper>
    )
}

export default memo(Recommend)