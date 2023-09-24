import styled from 'styled-components';

export const AboutUsContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 50px;
  padding-top: 100px;
  background-color: white;

  @media screen and (max-width: 767px) {
    padding: 0 25px;
    padding-top: 50px;
  }
`;

export const AboutUsCard = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
`;

export const AboutUsCardLeft = styled.div``;

export const AboutUsCardImage = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;

  @media screen and (max-width: 767px) {
    width: 40px;
    height: 40px;
  }
`;

export const AboutUsCardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AboutUsCardRight = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  color: black;
`;

export const AboutUsCardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;

  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

export const AboutUsCardDesc = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2;
  color: #8c8c8c;

  @media screen and (max-width: 767px) {
    font-size: 1rem;
  }
`;
