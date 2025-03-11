import styled from "styled-components";
import playpanel_bg from '@/assets/img/playpanel_bg.png'

export const PlayerPanelWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 46px;
  transform: translateX(-50%);
  width: 986px;
  height: 301px;
  color: #e2e2e2;

  .main {
    position: relative;
    display: flex;
    height: 260px;
    overflow: hidden;
    background: url(${playpanel_bg}) -1014px 0 repeat-y;
  }
`