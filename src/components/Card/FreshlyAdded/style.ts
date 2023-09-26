import { styled } from 'styled-components';

interface IFreshlyAddedProps {
  $maxWidth?: string;
}

export const CardWrapper = styled.div<IFreshlyAddedProps>`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '275px'};
  height: 450px;
  display: inline-block;
  position: relative;
  border-radius: 12px;
  overflow-y: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const Title = styled.a`
  color: black;
  font-weight: 700;
  font-size: 2rem;
  transition: all 0.2s ease;
  width: 100%;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const CardInfo = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
  transition: all 0.2s ease;
  width: 100%;
  padding: 32px 30px 40px 40px;
`;

export const img = styled.img`
  width: 100%;
  height: 230px;
  background-size: cover;
  background-position: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  transition: all 0.3s linear;
`;

export const SaleOff = styled.span`
  position: absolute;
  top: 30px;
  right: 20px;
  background-color: #5c98f2;
  padding: 10px 15px;
  border-radius: 3px;
  border: none;
  color: white;
  font-weight: 700;
`;

export const CardInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  transition: all 0.4s linear;
`;

export const CardInfoContentBottom = styled.div`
  display: flex;
  gap: 10px;
`;

export const CardInfoContentDays = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: 500;
  line-height: 24px;
`;

export const CardInfoContentSalePrice = styled.span`
  display: block;
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: line-through;
  opacity: 0.5;
  line-height: 24px;
`;

export const CardInfoContentReviews = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > span {
    transform: translateY(4px);
    opacity: 0.5;
    font-weight: 400;
  }
`;

export const CardInfoContentPrice = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: 600;
  color: #5c98f2;
`;

export const CardInfoContentPriceWithoutSale = styled.div`
  display: block;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 24px;
  color: #8f8f8f;

  span {
    margin-left: 10px;
    font-size: 1.6rem;
    font-weight: 600;
    color: #5c98f2;
    opacity: 1;
  }
`;
