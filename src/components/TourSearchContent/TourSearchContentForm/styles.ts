import { Form, Input, Rate, Select } from 'antd';
import styled from 'styled-components';
import { Calendar } from 'primereact/calendar';

export const TourSearchContentForm = styled(Form)`
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
`;

export const TourSearchContentTitle = styled.div`
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

export const TourSearchContentFormItem = styled(Form.Item)`
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

export const TourSearchContentFormDate = styled(Form.Item)`
  & .ant-form-item-control-input {
    border-radius: 4px;
    border: 1px solid #d1d5db;
  }

  & label {
    font-size: 1.4rem !important;
    font-weight: 600 !important;
  }
`;

export const TourSearchContentFormRate = styled(Rate)`
  display: flex;
  align-items: center;
  width: 100%;

  & li svg {
    width: 25px;
    height: 25px;
  }
`;

export const TourSearchContentFormButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.8rem;
  color: #5c98f2;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;

export const TourSearchContentFormInput = styled(Input)``;

export const TourSearchContentFormSelect = styled(Select)``;

export const TourSearchContentFormCalendar = styled(Calendar)``;

export const TourSearchContentFormLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d1d5db;
  margin-top: 60px;
  margin-bottom: 30px;
`;
