import styled from 'styled-components'

export const AlbumItemWrapper = styled.div`
  margin-left: 6px;
  margin-top: 15px;
  background-position: -260px 100px;

  .top {
    position: relative;
    width: 118px;
    height: 100px;
    margin-bottom: 7px;
    overflow: hidden;

    img {
      width: 100px;
      height: 100px;
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: 0 -570px;
      text-indent: -9999px;
    }

    .play {
      position: absolute;
      left: 72px;
      right: 10px;
      bottom: 5px;
      height: 22px;
      background-position: 0 -85px;
      visibility: hidden;
    }

    &:hover {
        .play {
            visibility: visible;
        }
    }
  }

  .bottom {
    font-size: 12px;
    width: 100px;
    .name {
      color: #000;
      ${(props) => props.theme.mixin.textNowrap}
    }

    .artist {
      color: #666;
      ${(props) => props.theme.mixin.textNowrap}
    }
  }
`

