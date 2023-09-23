import styled from 'styled-components';

export const LanguageWrapper = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 10px;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const LanguageImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
