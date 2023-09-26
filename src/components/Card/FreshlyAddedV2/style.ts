import { styled } from 'styled-components';

interface IFreshlyAddedProps {
  $maxWidth?: string;
}

export const CardWrapper = styled.div<IFreshlyAddedProps>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '275px'};
  max-height: 350px;
  border-radius: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    max-height: 100%;
  }
`;

export const Title = styled.a`
  color: black;
  font-weight: 700;
  font-size: 1.6rem;
  transition: all 0.2s ease;
  width: 100%;
  align-self: flex-start;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: black;
  transition: all 0.2s ease;
  width: 100%;
  padding: 32px 30px 40px 40px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const CardImg = styled.img`
  width: 100%;
  max-width: 270px;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: all 0.3s linear;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    max-width: 100%;
    max-height: 416px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 12px;
  }
`;

export const SaleOff = styled.span`
  position: absolute;
  top: 30px;
  left: -10px;
  background-color: #5c98f2;
  padding: 10px 15px;
  border: none;
  color: white;
  font-weight: 700;

  &::after {
    content: '';
    position: absolute;
    top: calc(100% - 2px);
    left: 0px;
    border-left: 7px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid #5988ba;
    transform: rotate(45deg);
    z-index: 1;
  }
`;

export const CardInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
  width: 100%;
  height: 100%;
  transition: all 0.4s linear;
  border-left: 1px solid #e4e4e7;

  @media screen and (max-width: 767px) {
    border-color: transparent;
  }
`;

export const CardInfoContentTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 1.4rem;
  font-weight: 500;
  opacity: 0.5;
  line-height: 24px;

  span {
    display: inline-block;
    text-decoration: line-through;
    line-height: inherit;
    font-weight: inherit;
    font-size: inherit;
    opacity: inherit;
  }
`;

export const CardInfoContentReviews = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  & > span {
    transform: translateY(4px);
    opacity: 0.5;
    font-weight: 400;
  }
`;

export const CardInfoContentPrice = styled.span`
  display: block;
  font-size: 2rem;
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
