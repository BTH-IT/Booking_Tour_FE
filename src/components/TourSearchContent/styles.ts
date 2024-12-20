import styled from 'styled-components';

export const TourSearchContentWrapper = styled.section`
  width: 100%;
  max-width: 1300px;
  padding: 0 20px;
  padding-top: 70px;
  margin: 0 auto;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  overflow: hidden;
`;

export const TourSearchContentRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 60px;
`;

export const TourSearchContentResult = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
`;
