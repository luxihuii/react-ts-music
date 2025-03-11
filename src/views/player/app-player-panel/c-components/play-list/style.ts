import styled from 'styled-components'
import playlist_sprite from '@/assets/img/playlist_sprite.png'

export const PlayListWrapper = styled.div`
  position: relative;
  width: 553px;
  padding: 2px;
  overflow-y: scroll;

  /* 滚动条整体样式 */
  &::-webkit-scrollbar {
    width: 6px; /* 滚动条宽度 */
  }

  /* 滚动条轨道样式 */
  &::-webkit-scrollbar-track {
    background: rgb(13, 13, 13); /* 轨道背景颜色 */
  }

  /* 滚动条滑块样式 */
  &::-webkit-scrollbar-thumb {
    background: #444; /* 滑块颜色 */
    border-radius: 6px; /* 滑块圆角 */
    border: 1px solid #555;
  }

  .play-item {
    padding: 0 8px 0 25px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    line-height: 28px;
    color: #ccc;

    .operator {
      visibility: hidden;
      z-index: 9999px;
    }

    &:hover {
      color: #fff;
      background-color: #000;
      .operator {
        visibility: visible;
        position: absolute;
        right: 170px;
        color: #ccc;

        button {
          background-color: transparent;
          color: #ccc;
          padding: 0 3px;
          cursor: pointer;
        }

        .icon {
          display: inline-block;
          width: 15px;
          height: 16px;
          position: relative;
          bottom: 1px;
          right: 2px;
          padding: 0 3px;
          text-indent: -9999px;
        }

        .favor {
          background-position: -24px 0;

          &:hover {
            background-position: -24px -20px;
          }
        }

        .share {
          background-position: 0 0;

          &:hover {
            background-position: 0 -20px;
          }
        }

        .download {
          background-position: -57px -50px;

          &:hover {
            background-position: -80px -50px;
          }
        }

        .remove {
          width: 13px;
          background-position: -51px 0;

          &:hover {
            background-position: -51px -20px;
          }
        }
      }
    }

    &.active {
      color: #fff;
      background-color: #000;

      &::before {
        content: '';
        position: absolute;
        left: 8px;
        width: 10px;
        height: 13px;
        background: url(${playlist_sprite}) -182px 0;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .singer {
        width: 70px;
        ${(props) => props.theme.mixin.textNowrap}
      }

      .duration {
        padding-left: 10px;
        width: 45px;
      }

      .link {
        margin-left: 20px;
        width: 14px;
        height: 16px;
        background-position: -80px 0;

        &:hover {
            background-position: -80px -20px;
        }
      }
    }
  }
`