import styled, { css } from "styled-components";

interface IHeaderWrapperProps {
  $isScroll?: boolean;
  $isSticky?: boolean;
}

export const HeaderWrapper = styled.header<IHeaderWrapperProps>`
  position: ${({ $isSticky }) => (!$isSticky ? "sticky" : "none")};
  top: 0;
  width: 100%;
  padding: 0 26px;
  transition: all 0.2s linear;
  z-index: 2;

  ${({ $isScroll }) =>
    $isScroll
      ? css`
          box-shadow:
            rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
            rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
          background-color: rgba(255, 255, 255, 0.85);
        `
      : css`
          background-color: transparent;
        `}

  @media screen and (max-width: 767px) {
    padding: 0;
  }
`;

export const HeaderContainer = styled.div<IHeaderWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: all 0.2s linear;
  padding: ${({ $isScroll }) => ($isScroll ? "20px" : "30px 20px")};
`;

export const HeaderResponsive = styled.div`
  display: none;
  flex: 1;
  @media only screen and (min-width: 1000px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const HeaderResponsiveIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4rem;
  color: black;
  cursor: pointer;
  @media only screen and (min-width: 1000px) {
    display: none;
  }
`;
