import styled from "styled-components";

export const SearchWrapper = styled.div`
  /* display: flex;
   width: 300px;
   margin: 40px auto;
   background-color: #fff;

  .list {
    .item {
      position: relative;
      display: flex;
      align-items: center;
      height: 40px;
      font-size: larger;

      &:nth-child(-n + 3) .rank {
        color: #c10d0c;
      }

      .rank {
        width: 35px;
        text-align: center;
        margin-left: 10px;
        font-size: 16px;
      }

      .info {
        color: #000;
        width: 178px;
        height: 17px;
        line-height: 17px;
        display: flex;
        justify-content: space-between;

        .name {
          flex: 1;

          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }

        .operator {
          display: flex;
          align-items: center;
          display: none;
          width: 82px;

          .btn {
            width: 17px;
            height: 17px;
            margin-left: 8px;
            cursor: pointer;
          }

          .play {
            background-position: -267px -268px;
          }

          .add {
            position: relative;
            top: 2px;
            background-position: 0 -700px;
          }

          .favor {
            background-position: -297px -268px;
          }
        }
      }

      &:hover {
        .operator {
          display: block;
        }
      }
    }
  } */
  width: 300px;
  margin: 40px auto;
  background-color: #fff;
  height: 600px; /* 添加固定高度 */

  .list {
    height: 100%; /* 确保list填满容器 */

    /* 修正列表项样式 */
    .item {
      position: relative;
      display: flex;
      align-items: center;
      height: 40px;
      font-size: larger;
      box-sizing: border-box; /* 添加盒模型 */

      &:nth-child(-n + 3) .rank {
        color: #c10d0c;
      }

      .rank {
        width: 50px;
        text-align: left;
        margin-left: 10px;
        font-size: 16px;
      }

      .info {
        color: #000;
        width: 100%; /* 修改宽度 */
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center; /* 垂直居中 */

        .name {
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }

        .operator {
          display: flex;
          align-items: center;
          width: 82px;
          visibility: hidden; /* 修改为visibility */

          .btn {
            width: 17px;
            height: 17px;
            margin-left: 8px;
            cursor: pointer;
          }

          .play {
            background-position: -267px -268px;
          }

          .add {
            position: relative;
            top: 2px;
            background-position: 0 -700px;
          }

          .favor {
            background-position: -297px -268px;
          }
        }
      }

      &:hover .operator {
        visibility: visible; /* 对应修改 */
      }
    }
  }

  .empty {
    text-align: center;
    padding: 20px;
    color: #999;
  }
`