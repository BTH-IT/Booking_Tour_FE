import { Rate } from 'antd';
import styled from 'styled-components';

export const CustomerReviewWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 25px;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 70px 70px 60px 70px;
  width: 100%;
  max-width: 680px;
  height: 350px;

  @media screen and (max-width: 1000px) {
    max-width: 580px;
    height: 300px;
    padding: 35px 35px 30px 35px;
  }

  @media screen and (max-width: 767px) {
    max-width: 350px;
    height: 400px;
    flex-direction: column;
    align-items: center;
    justify-content: unset;
  }

  @media screen and (max-width: 526px) {
    max-width: 250px;
  }

  @media screen and (max-width: 426px) {
    max-width: 200px;
    padding: 10px;
  }

  @media screen and (max-width: 326px) {
    max-width: 100px;
  }
`;

export const CustomerReviewLeft = styled.div``;

export const CustomerReviewAvatar = styled.div`
  width: 82px;
  height: 82px;
  overflow: hidden;
  border-radius: 50%;
`;

export const CustomerReviewAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CustomerReviewRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CustomerReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: unset;
  }
`;

export const CustomerReviewName = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
`;

export const CustomerReviewContent = styled.p`
  font-size: 1.4rem;
  text-align: justify;
  line-height: 1.2;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
`;

export const CustomerReviewRate = styled(Rate)`
  transform: translateY(-5px) !important;
`;
