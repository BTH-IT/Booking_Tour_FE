import styled from 'styled-components';

export const SearchContentWrapper = styled.section`
  width: 100%;
  max-width: 1300px;
  padding: 0 20px;
  padding-top: 70px;
  margin: 0 auto;
  color: black;
  font-family: 'DM Serif Display', sans-serif;
`;

export const SearchContentRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const SearchContentResult = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  font-family: 'DM Serif Display', sans-serif;
`;
