import { Form } from 'antd';
import styled from 'styled-components';

export const ReviewsWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 60px;
`;

export const ReviewsHeader = styled.div`
  padding: 20px 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  display: flex;
  gap: 10px;
  color: black;
  align-items: center;
  justify-content: space-between;
`;

export const ReviewsHeaderSortRating = styled.div`
  display: flex;
  gap: 10px;
  color: black;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 1.4rem;
`;

export const ReviewsHeaderSortDate = styled.div`
  display: flex;
  gap: 10px;
  color: black;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 1.4rem;
`;

export const ReviewsHeaderSort = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  span {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export const ReviewsCount = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

export const ReviewsCommentForm = styled(Form)``;

export const ReviewsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ReviewsContentItem = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid gray;
`;

export const ReviewsContentItemImg = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ReviewsContentItemName = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  flex-shrink: 0;
  color: black;
`;

export const ReviewsContentItemType = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
  flex-shrink: 0;
  color: black;
`;

export const ReviewsContentItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: space-between;
  flex: 1;
  p {
    font-size: 1.6rem;
    line-height: 1.5;
    color: black;
  }

  span {
    font-size: 2rem;
  }
`;