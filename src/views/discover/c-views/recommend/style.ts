import styled from "styled-components"
import wrap_bg from '@/assets/img/wrap-bg.png'

export const RecommendWrapper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    background-image: url(${wrap_bg});
    display: flex;

    > .left {
      padding: 20px;
      width: 729px;
      box-sizing: border-box;
    }

    > .right {
      margin-left: 1px;
      width: 250px;

      img {
        margin: 5px 0;
        width: 100%;
        cursor: pointer;
      }
    }
  }
`