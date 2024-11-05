import { Form, Input, Select } from 'antd';
import styled from 'styled-components';

export const InputFormItemStyled = styled(Form.Item)`
  label {
    margin-top: 2px;
    display: block;
    font-size: 1.8rem !important;
  }
`;

export const InputStyled = styled(Input)`
  font-size: 1.5rem;
  margin-left: 10px;
`;

export const InputTextAreaStyled = styled(Input.TextArea)`
  font-size: 1.5rem;
  margin-left: 10px;
`;

export const InputSelectStyled = styled(Select)`
  .ant-select-selection-item {
    font-size: 1.5rem;
  }
  margin-left: 10px;
`;

export const InputPasswordStyled = styled(Input.Password)`
  font-size: 1.5rem;
  margin-left: 10px;
`;
