import styled from 'styled-components';

export const NavHeaderWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 26px;
`;

export const NavHeaderItem = styled.li``;

export const NavHeaderItemLink = styled.a`
  display: inline-block;
  padding: 20px;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: #212121;
  opacity: 0.6;
  transition: all 0.2s linear;

  &:hover {
    opacity: 1;
  }
`;
