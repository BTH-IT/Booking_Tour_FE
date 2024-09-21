import styled from "styled-components";

export const ReviewsContentItem = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid gray;

  @media screen and (max-width: 567px) {
    flex-direction: column;
  }
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
