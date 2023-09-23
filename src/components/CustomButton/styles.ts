import { Button } from 'antd';
import styled from 'styled-components';

interface IButonProps {
  width?: string;
}

export const CustomButtonStyled = styled(Button)<IButonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: ${(props) => props.width ?? '190px'};
  border-radius: 10px;
  padding: 7px 25px;

  span {
    font-size: 1.2rem !important;
    font-weight: 600;
  }
`;
