import styled from "styled-components";

export const AnchorWrapper = styled.div`
  padding: 20px;

  .anchors {
    margin-top: 20px;

    .item {
      display: flex;
      margin-bottom: 10px;
      width: 210px;
      .image {
        img {
          margin: 0px;
          width: 40px;
          height: 40px;
        }
      }

      .info {
        line-height: 20px;
        width: 160px;
        margin-left: 8px;
        .name {
          color: #000;
          font-weight: 400;
          margin-top: 3px;
        }

        .desc {
          color: #666;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
`