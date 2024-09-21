import styled from 'styled-components';

interface IOverlayProps {
  $isShow: boolean;
}

export const OverlayWrapper = styled.div<IOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: #0c0a09;
  opacity: ${({ $isShow }) => ($isShow ? '0.3' : '0')};
  visibility: ${({ $isShow }) => ($isShow ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  cursor: pointer;
`;
