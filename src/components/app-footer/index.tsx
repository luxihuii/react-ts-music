import { Fragment, memo } from 'react'
import type { FC, ReactNode } from 'react'

import { FooterWrapper, FooterTop, FooterBottom, FooterItem } from './style'
import { footerImages, footerLinks } from '@/assets/data/local_data'

interface IProps {
  children?: ReactNode
}

const AppFooter: FC<IProps> = () => {
  return (
    <FooterWrapper>
      <div className="wrap-v2 content">
        <FooterTop>
          {footerImages.map((item, index) => {
            return (
              <FooterItem className="item" key={item.link} idx={index}>
                <a
                  className="link"
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {' '}
                </a>
                <span className="title">{item.title}</span>
              </FooterItem>
            )
          })}
        </FooterTop>
        <FooterBottom>
          <div className="link">
            {footerLinks.map((item) => {
              return (
                <Fragment key={item.title}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                  <span className="line">|</span>
                </Fragment>
              )
            })}
          </div>
          <div className="copyright">
            <span>
              <a
                href="https://jubao.163.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                廉政举报
              </a>
            </span>
            <span>不良信息举报邮箱: 51jubao@service.netease.com</span>
            <span>客服热线：95163298</span>
          </div>
          <div className="report">
            <span>
              互联网宗教信息服务许可证：浙（2022）0000120
              增值电信业务经营许可证：浙B2-20150198
            </span>
            <span>
              <a
                href="https://beian.miit.gov.cn/#/Integrated/index"
                target="_blank"
                rel="noopener noreferrer"
              >
                粤B2-20090191-18 工业和信息化部备案管理系统网站
              </a>
            </span>
          </div>
          <div className="info">
            <span>网易公司版权所有©1997-2025</span>
            <span>
              杭州乐读科技有限公司运营：
              <a
                href="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/34942157981/2e30/30c1/ad1f/7be053a28e91dd8bafe49bdf6455cb2a.png"
                rel="noopener noreferrer"
                target="_blank"
              >
                浙网文[2024] 0900-042号
              </a>
            </span>
            <span>
              <img src="src/assets/img/police.png" alt="" />
              <a
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564"
                rel="noopener noreferrer"
                target="_blank"
              >
                浙公网安备 33010802013307号
              </a>
            </span>
            <span>
              <a
                href="https://y.music.163.com/m/at/661f2af6e36f7c50ead8994b"
                rel="noopener noreferrer"
                target="_blank"
              >
                算法服务公示信息
              </a>
            </span>
          </div>
        </FooterBottom>
      </div>
    </FooterWrapper>
  )
}

export default memo(AppFooter)
