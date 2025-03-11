import { memo } from "react"
import type { FC, ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { NavBarWrapper } from "./style"
import { discoverMenu } from "@/assets/data/local_data"

interface IProps {
    children?: ReactNode
}

const NarBar: FC<IProps> = () => {
    return (
      <NavBarWrapper>
        <div className="nav wrap-v1">
          {discoverMenu.map((item) => {
            return (
              <div className="item" key={item.title}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {item.title}
                </NavLink>
              </div>
            )
          })}
        </div>
      </NavBarWrapper>
    )
}

export default memo(NarBar)