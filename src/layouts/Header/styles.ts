import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  position: sticky;
  width: 100%;
  padding: 0 26px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  padding-top: 50px;
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
