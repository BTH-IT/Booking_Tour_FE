import { Button } from 'antd';
import styled from 'styled-components';

interface IButonProps {
  width?: string;
  height?: string;
  border_radius?: string;
}

export const CustomButtonStyled = styled(Button)<IButonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height ?? '100%'};
  width: 100%;
  max-width: ${(props) => props.width ?? '190px'};
  border-radius: ${(props) => props.border_radius ?? '10px'};
  padding: 7px 25px;
  background-color: #5c98f2;
  color: white;
  transition: all 0.2s ease;
  border: none;

  span {
    font-size: 1.2rem !important;
    font-weight: 600;
    color: inherit;
  }

  &:hover,
  &:focus,
  &:active {
    background-color: #5c98f2 !important;
    color: white !important;
    span {
      background-color: #5c98f2 !important;
      color: white !important;
    }
  }
`;
