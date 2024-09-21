import styled, { css } from 'styled-components';

export const FooterWrapper = styled.footer``;

export const FooterTopContainer = styled.div`
  width: 100%;
  background-color: #1a1a1a;
  padding: 100px 20px;
  color: white;
`;

export const FooterTop = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`;

export const FooterTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 30px;
  z-index: 1;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const FooterContent = styled.div`
  font-size: 1.4rem;
  line-height: 2;
  span {
    font-size: inherit;
    color: #9a9a9a;
  }

  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

export const FooterSocialList = styled.ul`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const FooterSocialItem = styled.li`
  font-size: 2.6rem;
  a {
    font-size: 1.6rem;
    color: white;
  }
`;

export const FooterContentLink = styled.a`
  font-size: 1.6rem;
  color: #9a9a9a;
`;

export const FooterBottomContainer = styled.div`
  width: 100%;
  background-color: #000000;
  color: white;
  padding: 10px 0;
`;

export const FooterBottom = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  ul {
    justify-content: unset;
    align-items: unset;
    padding: 0;
    a {
      color: white;
    }
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;

    ul {
      justify-content: center;
    }
  }
`;

export const FooterBottomCopyright = styled.p`
  flex-shrink: 0;
  color: #838383;
  font-size: 1.4rem;

  @media screen and (max-width: 767px) {
    text-align: center;
  }
`;
