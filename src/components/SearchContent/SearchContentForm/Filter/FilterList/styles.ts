import styled from 'styled-components';

export const FilterListWrapper = styled.div``;

export const FilterListTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const FilterListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & .ant-checkbox-wrapper span {
    font-size: 1.6rem !important;
  }
`;

export const FilterListContentShowMore = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  font-size: 1.3rem;
  color: #5c98f2;
  opacity: 0.6;
  transition: all 0.2s linear;

  &:hover {
    opacity: 1;
  }
`;
