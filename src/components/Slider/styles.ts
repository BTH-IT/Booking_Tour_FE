import Slider from 'react-slick';
import styled from 'styled-components';

export const SliderStyled = styled(Slider)`
  .slick-prev {
    left: -52px !important;
  }

  .slick-next:before,
  .slick-prev:before {
    content: '' !important;
  }

  .slick-list {
    .slick-track {
      .slick-slide > div {
        display: flex;
        justify-content: center;
      }
    }
  }

  .next-slick-arrow,
  .prev-slick-arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #939393;
    font-size: 38px;
    background-color: #ededed;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    padding: 10px;
  }
`;

export const SliderPrevBtn = styled.div`
  position: absolute;
  left: 0;
  font-size: 6rem;
`;

export const SliderNextBtn = styled.div`
  position: absolute;
  right: 0;
  font-size: 6rem;
`;
