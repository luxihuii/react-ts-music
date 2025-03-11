import { memo } from "react"
import type { FC, ReactNode } from "react"
import { AnchorWrapper } from "./style"
import AreaHeaderV2 from "@/components/area-header-v2"
import { shallowEqualApp, useAppSelector } from "@/store"
import { getImageSize } from "@/utils/format"
import { hotAnchors } from "@/assets/data/local_data"

interface IProps {
    children?: ReactNode
}

const HotAnchor: FC<IProps> = () => {
    return (
        <AnchorWrapper>
            <AreaHeaderV2 title="热门主播"/>
            <div className="anchors">
                {
                    hotAnchors.map((item) => {
                        return (
                          <div className="item" key={item.picUrl}>
                            <a href="" className="image">
                              <img src={getImageSize(item.picUrl, 40)} alt="" />
                            </a>
                            <div className="info">
                              <div className="name">{item.name}</div>
                              <div className="desc">{item.position}</div>
                            </div>
                          </div>
                        )
                    })
                }
            </div>
        </AnchorWrapper>
    )
}

export default memo(HotAnchor)