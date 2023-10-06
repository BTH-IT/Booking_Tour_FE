import styled from 'styled-components';

export const AccordionWrap = styled.div`
  padding: 20px;
  border-bottom: 1px solid #bfbbbb;
`;

export const AccordionTitle = styled.h4<{ $isShow: boolean }>`
  font-size: 1.6rem;
  font-family: 'DM Serif Display', sans-serif;
  font-weight: 600;
  color: ${({ $isShow }) => ($isShow ? '#5c98f2' : 'black')};
  transition: all 0.2s ease;
  cursor: pointer;
`;

export const AccordionContent = styled.div<{ $isShow: boolean }>`
  max-height: ${({ $isShow }) => ($isShow ? '140px' : '0px')};
  transition: all 0.2s ease;
  overflow: hidden;
  margin-top: 20px;
  font-size: 1.4rem;
  text-align: justify;
  line-height: 1.5;
`;
