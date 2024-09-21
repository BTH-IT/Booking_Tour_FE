import { Form } from "antd";
import styled from "styled-components";

export const ReviewsWrapper = styled.section`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 60px;
  padding: 20px;
`;

export const RoomReviewsWrapper = styled.section`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
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

  @media screen and (max-width: 567px) {
    flex-direction: column;
    gap: 30px;
  }
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

export const ReviewsCommentForm = styled(Form)`
  margin-top: 40px;
  span {
    font-size: 4rem;
  }

  & .ant-rate {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 100%;
  }
`;

export const ReviewsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
