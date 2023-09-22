import { Button } from 'antd';
import styled from 'styled-components';

export const CustomButtonStyled = styled(Button)`
  padding: 7px 25px;
  border-radius: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 190px;

  span {
    font-size: 1.2rem !important;
    font-weight: 600;
  }
`;
