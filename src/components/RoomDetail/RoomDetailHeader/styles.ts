import styled from 'styled-components';
import { Row, Col } from 'antd';
import { UsersRound } from 'lucide-react';

export const RoomDetailHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
`;

export const RoomDetailHeaderName = styled.h2`
  display: flex;
  gap: 20px;
  flex-direction: column;
  font-size: 4rem;
  color: black;
  font-weight: 500;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const RoomDetailHeaderSubInfo = styled.div`
  display: flex;
  align-items: center;
  /* gap: 40px; */

  @media screen and (max-width: 765px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

export const RoomDetailHeaderSubInfoItem = styled(Row)`
  display: flex;
  align-items: center;
  /* gap: 40px; */
  color: #8c8c8c;
  font-weight: 400;
  line-height: 1.1rem;
`;

export const RoomDetailHeaderSubInfoCol = styled(Col)`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 600px;
`;

export const RoomDetailHeaderSubInfoDetail = styled.span`
  font-size: 1.4rem;
  color: inherit;
  width: 100%;
  font-weight: inherit;
`;

export const MdPeopleOutlined = styled(UsersRound)`
  width: 35px !important;
  height: 35px !important;
`;

export const RoomDetailHeaderTitle = styled.div`
  color: inherit;
  font-weight: inherit;
  font-size: inherit;
  font-family: 'DM Serif Display', sans-serif;
`;

export const RoomDetailHeaderRate = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  & li svg {
    width: 20px;
    height: 20px;
  }
`;

export const RoomDetailHeaderReviews = styled.span`
  font-size: 1rem;
  color: #8d8e95;
`;
