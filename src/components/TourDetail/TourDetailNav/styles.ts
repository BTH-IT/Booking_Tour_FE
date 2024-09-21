import styled from 'styled-components';

export const TourDetailNavWrapper = styled.div`
  border-bottom: 1px solid #8d8e95;
  position: sticky;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 2;

  @media screen and (max-width: 765px) {
    display: none;
  }
`;

export const TourDetailNav = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  gap: 10px;
`;

export const TourDetailNavItem = styled.a`
  display: inline-block;
  padding: 25px;
  font-size: 1.4rem;
  transition: all 0.2s linear;
  cursor: pointer;
  font-weight: 500;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: black;
  }

  &.active {
    color: black;
  }
`;

export const TourDetailNavLine = styled.div<{
  coords: { left: number; width: number };
}>`
  height: 3px;
  position: absolute;
  background-color: #5c98f2;
  bottom: 0;
  left: ${(props) => `${props.coords.left}px` || '0px'};
  width: ${(props) => `${props.coords.width}px` || '95px'};
  transition: all 0.3s ease;
`;
