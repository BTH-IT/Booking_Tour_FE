import { Form, Select } from 'antd';
import styled from 'styled-components';

export const SelectFormItemStyled = styled(Form.Item)`
  min-height: 48px;
  label {
    font-size: 1.6rem !important;
  }
`;

export const SelectStyled = styled(Select)`
  font-size: 2rem;
`;
