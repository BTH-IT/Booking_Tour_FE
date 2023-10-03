import { Form, Select } from 'antd';
import styled from 'styled-components';

export const SelectFormItemStyled = styled(Form.Item)`
  & .ant-select {
    min-height: 48px !important;
  }

  label {
    font-size: 1.6rem !important;
  }
`;

export const SelectStyled = styled(Select)`
  .ant-select-selection-item {
    font-size: 2rem !important;
  }
`;
