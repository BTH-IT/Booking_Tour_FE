import { styled } from 'styled-components';

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 380px;
  height: 520px;
  display: inline-block;
  position: relative;
  border-radius: 12px;
  overflow-y: hidden;

  &:hover {
    img {
      filter: brightness(0.4);
    }

    & > div {
      transform: translateY(160px);
    }
  }
`;

export const Title = styled.a`
  color: white;
  font-weight: 700;
  font-size: 3rem;
  transition: all 0.2s ease;
  width: 100%;
  padding: 0 20px;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const CardInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  transition: all 0.2s ease;
  transform: translateY(50%);
  width: 100%;
`;

export const img = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  filter: brightness(0.6);
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
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 20px;
  transition: all 0.4s linear;
`;

export const CardInfoContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CardInfoContentRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;
