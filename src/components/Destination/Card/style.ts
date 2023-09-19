import { styled } from 'styled-components';

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 380px;
  height: 250px;
  position: relative;
  cursor: pointer;
  margin: 10px;
  overflow: hidden;

  &:hover {
    img {
      filter: brightness(0.4);
    }

    h4 {
      bottom: 60px;
    }

    h2 {
      bottom: 30px;
    }

    div {
      transform: translateY(20px);
    }
  }
`;

export const Title = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-weight: 700;
  font-size: 2rem;
`;

export const CardInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(155px);
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  font-weight: 700;
  transition: all 0.3s ease;
`;

export const subTitle = styled.h4`
  text-align: center;
  width: 300px;
  color: white;
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 1.5;
`;

export const img = styled.img`
  width: 380px;
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  filter: brightness(0.6);
  transition: all 0.3s linear;
`;
export const View = styled.h2`
  color: #5c98f2;
  font-weight: 700;
`;

export const Tours = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #5c98f2;
  padding: 10px 15px;
  border-radius: 3px;
  border: none;
  color: white;
  font-weight: 700;
`;
