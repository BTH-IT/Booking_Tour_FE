import styled from 'styled-components';

export const FreshlyAddedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 100px;
`;

export const FreshlyAddedTitle = styled.h3`
  color: black;
  font-size: 5rem;
  font-family: 'DM Serif Display', sans-serif;
  font-weight: 400;
  text-align: center;

  span {
    font-size: inherit;
    font-family: inherit;
    color: #5c98f2;
  }

  @media screen and (max-width: 480px) {
    font-size: 3.2rem;
  }
`;