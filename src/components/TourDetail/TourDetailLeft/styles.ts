import styled from 'styled-components';

export const TourDetailLeftContent = styled.section``;

export const TourDetailLeftTitle = styled.h2`
  line-height: 1.2;
  font-size: 2.3rem;
  color: black;
  font-family: 'DM Serif Display', sans-serif;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const TourDetailLeftMapTitle = styled.h2`
  line-height: 1.2;
  font-size: 2.3rem;
  color: black;
  font-family: 'DM Serif Display', sans-serif;
  font-weight: 500;
  margin-top: 60px;
  margin-bottom: 20px;
`;

export const TourDetailLeftParagraph = styled.p`
  font-size: 1.5rem;
  text-align: justify;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 40px;
  color: #605656;
`;

export const TourDetailLeftPriceIncludes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TourDetailLeftPriceExcludes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TourDetailLeftPriceIncludesTitle = styled.h4`
  font-size: 1.4rem;
  color: black;
  font-weight: 500;
`;

export const TourDetailLeftPriceExcludesTitle = styled.h4`
  font-size: 1.4rem;
  color: black;
  font-weight: 500;
`;

export const TourDetailLeftPriceIncludesItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 2rem;
  color: #605656;

  p {
    font-size: 1.4rem;
    color: #605656;
    font-weight: 400;
  }
`;

export const TourDetailLeftActivities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TourDetailLeftSeperate = styled.div`
  background-color: #605656;
  height: 1px;
  margin: 60px 0;
  opacity: 0.4;
`;

export const TourDetailLeftMap = styled.div`
  width: 100%;
`;
