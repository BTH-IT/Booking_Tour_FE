import { Button } from 'antd';
import styled from 'styled-components';

export const RoomDetailLeftContent = styled.section``;

export const RoomDetailLeftTitleWrapper = styled.div``;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Separator = styled.div`
  border-bottom: 1px solid #e1e1e1;
  margin-block: 30px;
`;

export const WishListButton = styled(Button)`
  padding-block: 20px;
  & > span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  & > span > span {
    font-size: 1.2rem;
  }
  &:disabled {
    background: rgba(255, 255, 255, 50) !important;
  }
`;

export const RoomDetailLeftFirstTitle = styled.h2`
  line-height: 1.2;
  font-size: 2rem;
  color: black;
  font-weight: 500;
`;

export const ActualPrice = styled.span`
  font-size: 2rem;
  padding-left: 7px;
  color: black;
`;

export const RoomDetailLeftSecondTitle = styled.h5`
  line-height: 2;
  font-size: 1.5rem;
  color: #8c8c8c;
  font-weight: 400;
  margin-bottom: 30px;
`;

export const RoomDetailLeftParagraph = styled.div`
  margin-bottom: 20px;
  font-size: 1.4rem !important;

  & > * {
    font-size: 1.4rem !important;
  }
`;

export const RoomDetailLeftAmenities = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
`;

export const RoomDetailLeftAmenitiesTitle = styled.h4`
  font-size: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  color: black;
  font-weight: 500;
  margin-block: 40px;
`;

export const RoomDetailLeftAmenitiesItem = styled.div`
  display: flex;
  width: 268px;
  padding: 30px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  align-items: center;
  justify-content: start;
  color: rgba(0, 0, 0, 0.5);
  font-size: 2.5rem;
  margin: 10px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border: none;
    transform: translateY(-3px); /* Move the element up */
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1); /* Add a shadow */
  }

  & > p {
    color: #848484;
    font-size: 1.5rem;
    font-weight: 400;
    padding-left: 10px;
  }
`;

export const RoomDetailLeftRule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
`;

export const RoomDetailLeftRuleItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 3rem;
  color: #605656;

  p {
    font-size: 1.5rem;
    color: #605656;
    font-weight: 400;
  }
`;
