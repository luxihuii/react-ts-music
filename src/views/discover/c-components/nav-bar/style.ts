import styled from 'styled-components'

export const NavBarWrapper = styled.div`
  height: 35px;
  background-color: ${(props) => props.theme.color.primary};

  .nav {
    display: flex;
    padding-left: 375px;
    position: relative;
    top: -4px;

    .item {
      a {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding: 0 12px;
        margin: 11px 17px 0;
        color: #fff;
        font-size: 12px;

        &:hover,
        &.active {
          text-decoration: none;
          background-color: #9b0909;
          border-radius: 20px;
        }
      }
    }
  }
`
