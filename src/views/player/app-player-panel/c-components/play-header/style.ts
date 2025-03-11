import styled from "styled-components";
import playpanel_bg from '@/assets/img/playpanel_bg.png'

export const PlayHeaderWrapper = styled.div`
  display: flex;
  height: 41px;
  line-height: 41px;
  background: url(${playpanel_bg}) 0 0;
`

export const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;
  width: 546px;
  padding-right: 10px;

  h3 {
    padding-left: 25px;
    color: #e2e2e2;
    font-weight: 700;
  }

  .operator {
    color: #ccc;

    button {
      background-color: transparent;
      color: #ccc;
      padding: 0 15px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;

        .favor {
          background-position: -24px -20px;
        }

        .remove {
          background-position: -51px -20px;
        }
      }

      .favor {
        background-position: -24px 0;
      }

      .remove {
        width: 13px;
        background-position: -51px 0;
      }
    }

    .line {
      position: absolute;
      top: 13px;
      left: 477px;
      height: 15px;
      border-left: 1px solid #000;
      border-right: 1px solid #2c2c2c;
    }

    .icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      position: relative;
      top: 4px;
      right: 2px;
      padding: 0 2px;
    }
  }
`

export const HeaderRight = styled.div`
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 14px;
`