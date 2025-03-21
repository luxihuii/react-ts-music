import { memo } from "react"
import type { FC, ReactNode } from "react"
import { RankingWrapper } from "./style"
import AreaHeaderV1 from "@/components/area-header-v1"
import { shallowEqualApp, useAppSelector } from "@/store"
import TopRankingItem from "../top-ranking-item"

interface IProps {
    children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
    const { playList, rankings } = useAppSelector((state) => ({
        playList: state.recommend.playList,
        rankings: state.recommend.rankings
    }), shallowEqualApp)

    return (
        <RankingWrapper>
            <AreaHeaderV1 title="榜单" moreLink="/discover/ranking"/>
            <div className="content">
                {rankings?.map((item, index) => {
                    return (
                        <TopRankingItem key={item[index]?.id} itemRankingData={item} itemPlayListData={playList[index]}/>
                    )
                })}
            </div>
        </RankingWrapper>
    )
}

export default memo(TopRanking)