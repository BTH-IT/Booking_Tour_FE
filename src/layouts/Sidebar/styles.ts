import styled, { css } from 'styled-components';

export const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100vh;
  background-color: #1f1f1f;
  padding: 0 35px;
  padding-top: 80px;
  z-index: 1;
`;

export const SidebarCloseIcon = styled.div`
  font-size: 2.6rem;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    color: white;
  }
`;

export const SidebarNav = styled.ul`
  display: flex;
  gap: 5px;
  flex-direction: column;
  margin-top: 50px;
`;

export const SidebarNavItem = styled.li`
  cursor: pointer;
`;

export const SidebarNavItemLink = styled.a<{ isactive?: 1 | 0 }>`
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 18px 0;
  border-bottom: 1px solid #626262;
  color: #979797;
  text-decoration: none;

  ${({ isactive }) =>
    isactive &&
    css`
      color: white;
    `}

  transition: all 0.2s linear;
  &:hover {
    color: white;
  }
`;

export const SidebarTranferAction = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;
