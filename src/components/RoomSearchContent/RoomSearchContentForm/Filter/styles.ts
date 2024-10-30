import styled from 'styled-components';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  color: #5c98f2;
`;

export const FilterHeaderIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  color: #5c98f2;
  cursor: pointer;
`;

export const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 2rem;
  font-weight: 600;
  color: black;

  span {
    font-size: inherit;
    font-weight: inherit;
    color: #5c98f2;
  }
`;

export const ShowFilterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  max-height: 0;
  transition: max-height 0.15s ease-out;
  overflow: hidden;

  &.active {
    max-height: 100vh;
    transition: max-height 0.25s ease-in;
  }
`;

export const FilterListWrapper = styled.div``;

export const FilterListTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const FilterListContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & span {
    font-size: 2.4rem !important;
  }
`;
