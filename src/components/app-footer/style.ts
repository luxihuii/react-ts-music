import styled from 'styled-components'
import sprite_footer from '@/assets/img/foot_enter_new2.png'
import sprite_xStudio from '@/assets/img/xStudio.png'
import sprite_aiLogo from '@/assets/img/aiLogo.png'
import sprite_cloudSong from '@/assets/img/cloudSong.png'
import sprite_xStudioHover from '@/assets/img/xStudioHover.png'
import sprite_aiLogoHover from '@/assets/img/aiLogoHover.png'
import sprite_cloudSongHover from '@/assets/img/cloudSongHover.png'

export const FooterWrapper = styled.div`
  height: 325px;
  background-color: #f2f2f2;
  color: #666;
  border-top: 1px solid #d3d3d3;

  .content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`

export const FooterTop = styled.ul`
  display: flex;
  margin-top: 33px;
  width: 100%;
  padding: 0 80px;
  box-sizing: border-box;
  justify-content: space-around;
`

interface IFooterItem {
    idx: number
}

export const FooterItem = styled.li<IFooterItem>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45px;

  .link {
    display: block;
    width: 45px;
    height: 45px;

    background-image: ${(props) => {
      switch (props.idx) {
        case 2:
          return `url(${sprite_xStudio})`
        case 4:
          return `url(${sprite_aiLogo})`
        case 5:
          return `url(${sprite_cloudSong})`
        default:
          return `url(${sprite_footer})`
      }
    }};

    &:hover {
        background-image: ${(props) => {
            switch (props.idx) {
              case 2:
                return `url(${sprite_xStudioHover})`
              case 4:
                return `url(${sprite_aiLogoHover})`
              case 5:
                return `url(${sprite_cloudSongHover})`
            }
        }};
    }

    ${(props) => {
      switch (props.idx) {
        case 0:
          return `background-position: -170px -5px`
        case 1:
          return `background-position: -5px -170px`
        case 3:
          return `background-position: -60px -60px`
        case 6:
          return `background-position: -170px -115px`
      }
    }};

    &:hover {
      ${(props) => {
        switch (props.idx) {
          case 0:
            return `background-position: -5px -115px`
          case 1:
            return `background-position: -60px -170px`
          case 3:
            return `background-position: -115px -5px`
          case 6:
            return `background-position: -60px -115px`
        }
      }};
    }

    background-size: ${(props) => {
      switch (props.idx) {
        case 2:
        case 4:
        case 5:
          return '45px'
        default:
          return '220px 220px'
      }
    }};
  }

  .title {
    margin-top: 10px;
    display: block;
    width: 100px;
    height: 16px;
    text-align: center
  }
`

export const FooterBottom = styled.div`
  padding-top: 60px;
  line-height: 24px;
  text-align: center;

  a {
    color: #666;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    margin-right: 15px;
  }

  .link {
    .line {
      color: #ddd;
      margin: 0 10px;

      &:last-child {
        display: none;
      }
    }
  }

  .info {
    img {
        height: 14px;
        width: 14px;
        margin-left: 2px;
        margin-top: 5px;
    }
  }
`