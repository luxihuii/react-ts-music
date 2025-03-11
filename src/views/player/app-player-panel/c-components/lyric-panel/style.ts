import styled from "styled-components";

export const LyricPanelWrapper = styled.div`
  position: relative;
  flex: 1;
  margin: 21px 0 20px 0;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .lrc-content {
    width: 354px;
    margin: 0 auto;
    .lrc-item {
      height: 32px;
      text-align: center;
      color: #989898;

      &.active {
        color: #fff;
        font-size: 14px;
      }
    }
  }
`