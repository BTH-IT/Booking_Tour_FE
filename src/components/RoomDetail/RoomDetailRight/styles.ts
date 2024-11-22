import { DatePicker, Form } from 'antd';
import styled from 'styled-components';

import CustomButton from '@/components/CustomButton';
import InputFormItem from '@/components/Input/InputFormItem';

const { RangePicker } = DatePicker;

export const RoomDetailRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RoomDetailRightBooking = styled.div`
  position: sticky;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  margin-bottom: 40px;
  border-radius: 20px;

  @media (max-width: 1200px) {
    margin-left: 0;
  }
`;

export const RoomDetailRightBookingTitle = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  span {
    font-size: 1.4rem;
    font-weight: 500;
    color: black;
  }
`;

export const RoomDetailRightBookingPrice = styled.h6`
  display: flex;
  align-items: flex-end;
  font-size: 2.6rem;
  color: black;
  gap: 10px;

  s,
  span {
    font-size: 1.4rem;
    font-weight: 400;
    color: inherit;
  }

  p {
    font-size: 3rem;
    font-weight: 600;
    color: inherit;
  }
`;

export const RoomDetailRightBookingForm = styled(Form)`
  padding: 20px 30px 30px 30px;
`;

export const RoomDetailRightBookingLabel = styled.div`
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.88);
  padding-bottom: 8px;
`;

export const FormInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  & > div {
    margin-bottom: 0 !important;
    width: 100%;
  }

  & > span {
    font-size: 1.3rem;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const RoomDetailRightBookingFormDate = styled(Form.Item)`
  input {
    font-size: 1.2rem !important;
  }
`;

export const RoomDetailDateRangePicker = styled(RangePicker)`
  width: 100%;
  height: 48px;
  padding-top: 2px;
`;

export const BookingButton = styled(CustomButton)`
  margin-top: 30px;

  &:disabled:hover {
    background-color: #f0f0f0 !important;
    color: rgba(0, 0, 0, 0.6) !important;

    span {
      background-color: #f0f0f0 !important;
    }
  }
`;

export const InputItem = styled(InputFormItem)`
  padding-block: 10px;
  font-size: 1.2rem;
  margin: 0 !important;
`;
