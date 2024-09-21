import styled, { css } from 'styled-components';

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

export const RoomTitleWrapper = styled.div`
  text-align: center;
  font-size: 6rem;
  font-weight: 500;
  color: black;
  letter-spacing: 2px;
  font-family: 'DM Serif Display', sans-serif;
`;

export const RoomSecondTitleWrapper = styled.div`
  padding-top: 20px;
  text-align: center;
  font-size: 1.6rem;
  color: #595959;
  letter-spacing: 2px;
  font-family: 'DM Sans', sans-serif;
`;
