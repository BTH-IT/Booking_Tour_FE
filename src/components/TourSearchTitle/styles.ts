import styled from 'styled-components';

export const TourSearchTitleWrapper = styled.div`
  text-align: center;
  font-size: 6rem;
  font-weight: 500;
  color: black;
  letter-spacing: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
`;

export const BackgroundWrapper = styled.div<{ $backgroundImg: string }>`
  padding: 140px 20px;
  ${({ $backgroundImg }) =>
    $backgroundImg &&
    `
    background-image: url(${$backgroundImg});
    background-color: white;
    background-position: center;
    background-size: cover;
    position: relative;
  `}
`;

export const TourSecondTitleWrapper = styled.div`
  padding-top: 20px;
  text-align: center;
  font-size: 1.6rem;
  color: #595959;
  letter-spacing: 2px;
  font-family: 'DM Sans', sans-serif;
`;
