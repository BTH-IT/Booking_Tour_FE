import styled from 'styled-components';

export const BookWithUsWrapper = styled.section`
  position: relative;
  width: 100%;
  margin-top: 100px;
  padding-bottom: 150px;
`;

export const BookWithUsContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (max-width: 767px) {
    max-width: 500px;
  }
`;

export const BookWithUsTag = styled.section`
  display: inline-block;
  border-color: #e1e1e1;
  padding: 16px 24px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  border-radius: 30px;
  color: #41ddb8;
  background-color: white;
  font-size: 1.4rem;
  font-weight: 700;

  @media screen and (max-width: 767px) {
    padding: 12px 24px;
  }
`;

export const BookWithUsTitle = styled.h3`
  margin: 30px 0;
  line-height: 1.2;
  font-size: 7.4rem;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;

  span {
    font-size: inherit;
    font-family: inherit;
    color: #5c98f2;
  }

  @media screen and (max-width: 767px) {
    font-size: 5.4rem;
  }
`;

export const BookWithUsDesc = styled.p`
  line-height: 1.5;
  font-size: 2rem;
  margin-bottom: 75px;

  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    margin-bottom: 50px;
  }
`;

export const BookWithUsBackground = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
  z-index: -2;
`;

export const BookWithUsImage = styled.img`
  position: absolute;
  width: 100%;
  max-width: 500px;
  height: 700px;
  z-index: -1;
  border-radius: 24px;
  top: -30px;
  left: 55%;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
