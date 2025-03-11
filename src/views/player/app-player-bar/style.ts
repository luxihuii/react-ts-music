import styled from 'styled-components'
import process_bar from '@/assets/img/progress_bar.png'
import sprite_icon from '@/assets/img/sprite_icon.png'
import pip_icon from '@/assets/img/pip_icon.png'
import audio_quality from '@/assets/img/audio-quality.png'

export const PlayerBarWrapper = styled.div`
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  height: 52px;
  background-position: 0 0;
  background-repeat: repeat;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 47px;
    width: 1030px;
  }
`

interface IBarControl {
  isplaying: string
}

export const BarControl = styled.div<IBarControl>`
  display: flex;
  align-items: center;

  .btn {
    cursor: pointer;
  }

  .prev,
  .next {
    width: 28px;
    height: 28px;
  }

  .prev {
    background-position: 0 -130px;

    &:hover {
      background-position: -30px -130px;
    }
  }

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0
      ${(props) => (props.isplaying === 'true' ? '-165px' : '-204px')};

    &:hover {
      background-position: -40px
        ${(props) => (props.isplaying === 'true' ? '-165px' : '-204px')};
    }
  }

  .next {
    background-position: -80px -130px;

    &:hover {
      background-position: -110px -130px;
    }
  }
`
export const BarPlayerInfo = styled.div`
  display: flex;
  width: 642px;
  align-items: center;

  .image {
    width: 34px;
    height: 35px;
    border-radius: 5px;
  }

  .info {
    flex: 1;
    color: #a1a1a1;
    margin-left: 10px;

    .song {
      color: #e1e1e1;
      position: relative;
      top: 10px;
      left: 8px;

      .singer-name {
        color: #a1a1a1;
        margin-left: 10px;
      }
    }

    .progress {
        margin: 3px 0 0 6px;
      display: flex;
      align-items: center;

      .ant-slider {
        position: relative;
        width: 493px;
        margin-right: 10px;

        &:hover {
            cursor: default;
        }

        .ant-slider-rail {
          height: 9px;
          background: url(${process_bar}) right 0;
        }

        .ant-slider-track {
          height: 9px;
          background: url(${process_bar}) left -66px;
        }

        .ant-slider-handle {
          margin-top: -4px;
          width: 22px;
          height: 24px;
          border: none;
          background: url(${sprite_icon}) 0 -250px;

          &::after {
            display: none;
          }
        }
      }

      .time {
        .current {
          color: #e1e1e1;
        }
        .divider {
          margin: 0 3px;
        }
      }
    }
  }
`

interface IBarOperator {
  playmode: number
}

export const BarOperator = styled.div<IBarOperator>`
  display: flex;
  align-items: center;
  position: relative;
  top: 3px;

  .btn {
    width: 25px;
    height: 25px;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .pip {
    cursor: pointer;
    background: url(${pip_icon});
    background-position: 0 0;

    &:hover {
      background-position: 0 -25px;
    }
  }

  .favor {
    cursor: pointer;
    background-position: -88px -163px;

    &:hover {
      background-position: -88px -189px;
    }
  }

  .share {
    cursor: pointer;
    background-position: -114px -163px;

    &:hover {
      background-position: -114px -189px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    width: 155px;
    padding-left: 13px;
    background-position: -147px -248px;

    .volume {
      background-position: -2px -248px;
      cursor: pointer;

      &:hover {
        background-position: -31px -248px;
      }

      input {
        writing-mode: vertical-lr;
        direction: rtl;
        position: absolute;
        left: 93px;
        height: 100px;
        bottom: 30px;
        z-index: 100;
      }
    }

    .loop {
      cursor: pointer;
      background-position: ${(props) => {
        switch (props.playmode) {
          case 0:
            return '-3px -344px'
          case 1:
            return '-66px -248px'
          default:
            return '-66px -344px'
        }
      }};

      &:hover {
        background-position: ${(props) => {
          switch (props.playmode) {
            case 0:
              return '-33px -344px'
            case 1:
              return '-95px -248px'
            default:
              return '-93px -344px'
          }
        }};
      }
    }

    .playlist {
      cursor: pointer;
      padding-left: 21px;
      text-align: center;
      color: #ccc;
      width: 38px;
      margin-bottom: 2px;
      background-position: -42px -68px;

      &:hover {
        background-position: -42px -98px;
      }
    }

    .quality {
      cursor: pointer;
      background: url(${audio_quality});
      background-size: 45px 30px;
      margin-left: 4px;
      width: 41px;
      margin-bottom: 6px;
    }
  }
`
