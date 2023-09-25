import { Form, Input, Select } from 'antd';
import styled from 'styled-components';

export const SearchContentForm = styled(Form)`
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
`;

export const SearchContentTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem;
  margin-bottom: 30px;

  span {
    font-size: 1.3rem;
    color: #5c98f2;
    font-weight: 700;
  }
`;

export const SearchContentFormItem = styled(Form.Item)`
  & .ant-form-item-control-input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #d1d5db;
  }

  & label {
    font-size: 1.4rem !important;
    font-weight: 600 !important;
  }
`;

export const SearchContentFormInput = styled(Input)``;

export const SearchContentFormSelect = styled(Select)``;
