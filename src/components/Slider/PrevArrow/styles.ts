import styled from 'styled-components';

export const PrevArrowStyled = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -65px;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;
