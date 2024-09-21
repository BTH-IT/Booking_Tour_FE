import styled from "styled-components";

export const TourDetailHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  gap: 20px;
`;

export const TourDetailHeaderName = styled.h2`
  display: flex;
  gap: 20px;
  flex-direction: column;
  font-size: 4rem;
  color: black;
  font-weight: 500;
  margin: 50px 0;
`;

export const TourDetailHeaderSubInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media screen and (max-width: 765px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

export const TourDetailHeaderSubInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 2.2rem;
  color: black;
  font-weight: 300;

  p {
    font-size: 1.5rem;
    color: inherit;
    font-weight: inherit;
  }
`;

export const TourDetailHeaderTitle = styled.div`
  color: inherit;
  font-weight: inherit;
  font-size: inherit;
  font-family: "DM Serif Display", sans-serif;
`;

export const TourDetailHeaderRate = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  & li svg {
    width: 20px;
    height: 20px;
  }
`;

export const TourDetailHeaderReviews = styled.span`
  font-size: 1rem;
  color: #8d8e95;
`;
