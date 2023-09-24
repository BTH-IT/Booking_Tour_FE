import styled from 'styled-components';

export const PopularToursContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 100px;
`;

export const PopularToursTitle = styled.h3`
  color: black;
  font-size: 5rem;
  font-family: 'DM Serif Display', sans-serif;
  font-weight: 400;
  text-align: center;
  margin-bottom: 60px;

  span {
    font-size: inherit;
    font-family: inherit;
    color: #5c98f2;
  }

  @media screen and (max-width: 480px) {
    font-size: 3.2rem;
  }
`;
