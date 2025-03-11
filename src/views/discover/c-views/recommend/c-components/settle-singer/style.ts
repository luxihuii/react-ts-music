import styled from "styled-components";

export const SingleWrapper = styled.div`
  padding: 20px 20px 10px 20px;

  .artists {
    padding-top: 6px;
    margin-bottom: 14px;

    .item {
      display: flex;
      height: 62px;
      margin-top: 14px;
      background-color: #fafafa;
      text-decoration: none;

      :hover {
        background-color: #f4f4f4;
      }

      img {
        margin: 0;
        width: 62px;
        height: 62px;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 3px 12px;
        border: 1px solid #e9e9e9;
        border-left: none;
        overflow: hidden;

        .name {
          font-size: 14px;
          font-weight: 700;
          color: #000;
        }

        .alias {
          font-size: 12px;
          color: #666;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  .apply-for {
    background-position: right -100px;
    padding-right: 5px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 4px;

    a {
      background-position: 0 -59px;
      color: #333;
      font-weight: 700;
      text-align: center;
      display: block;
      height: 31px;
      line-height: 31px;
    }

    &:hover {
      background-position: right -182px;

      a {
        background-position: 0 -141px;
      }
    }
  }
`