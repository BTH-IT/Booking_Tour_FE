import styled, { css } from 'styled-components';

export const DashboardTitleWrapper = styled.div<{ $backgroundImg: string }>`
  padding: 110px 20px;
  text-align: center;
  font-size: 4.5rem;
  font-weight: 500;
  color: black;
  letter-spacing: 2px;
  font-family: 'DM Serif Display', sans-serif;
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
