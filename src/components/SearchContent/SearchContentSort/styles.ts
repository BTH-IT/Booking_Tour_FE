import styled from 'styled-components';

export const SearchContentSortWrapper = styled.div`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 4px;
  border: 1px solid #d4d4d8;

  span {
    flex-shrink: 0;
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

export const SearchContentSortLayout = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 20px;
  font-size: 1.6rem;

  svg {
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      color: #5c98f2;
    }

    &.active {
      color: #5c98f2;
    }
  }
`;
