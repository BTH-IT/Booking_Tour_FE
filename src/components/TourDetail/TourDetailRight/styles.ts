import { Form } from 'antd';
import styled from 'styled-components';

export const TourDetailRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const TourDetailRightBookingTitle = styled.h6`
  font-size: 2rem;
  font-weight: 500;
  color: black;
  margin-bottom: 30px;
`;

export const TourDetailRightBookingPrice = styled.h6`
  display: flex;
  align-items: flex-end;
  font-size: 2.6rem;
  color: black;
  gap: 10px;

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

export const TourDetailRightBooking = styled.div`
  padding: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 16px;
  background-color: white;
`;

export const TourDetailRightBookingForm = styled(Form)`
  margin-top: 40px;
`;

export const TourDetailRightBookingFormDate = styled(Form.Item)`
  & .ant-form-item-control-input {
    border-radius: 4px;
    border: 1px solid #d1d5db;
    transition: all 0.2s linear;
  }

  & .ant-form-item-control-input {
    &:focus-within {
      border-color: #5c98f2;
    }
  }
`;

export const TourDetailRightBookingFormAvailable = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
  color: gray;
  margin: 30px 0;
  display: block;
`;

export const TourDetailRightBookingInfo = styled.div`
  display: flex;
  justify-content: right;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const TourDetailRightWishList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.6rem;
  cursor: pointer;
  span {
    font-size: 1.4rem;
    color: black;
  }
`;

export const TourDetailRightNumView = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.6rem;
  cursor: pointer;
  span {
    font-size: 1.4rem;
    color: black;
  }
`;

export const TourDetailRightBookingWithConfidence = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 16px;
  padding: 20px;
  background-color: white;
`;

export const TourDetailRightBookingWithConfidenceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 3rem;
  cursor: pointer;
  color: #5c98f2;
  span {
    font-size: 1.4rem;
    color: black;
  }
`;
export const TourDetailRightNeedHelpItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 3rem;
  cursor: pointer;
  color: black;
  span {
    font-size: 1.4rem;
    color: black;
  }
`;

export const TourDetailRightNeedHelp = styled.div`
  border: 2px solid black;

  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 20px;
  background-color: white;
`;
