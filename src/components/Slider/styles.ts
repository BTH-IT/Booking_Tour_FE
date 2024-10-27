import Slider from 'react-slick';
import styled from 'styled-components';

export const SliderStyled = styled(Slider)`
  .slick-prev {
    left: -52px !important;
  }
  width: 100%;
  max-width: 1300px !important;
  margin: 0 auto !important;

  .slick-next:before,
  .slick-prev:before {
    content: '' !important;
  }

  .slick-list {
    padding: 30px 0;

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

  .slick-list .slick-track .slick-slide > div > div {
    width: 90%;
  }

  @media screen and (max-width: 1500px) {
    max-width: 1000px !important;
  }

  @media screen and (max-width: 1150px) {
    max-width: 800px !important;
  }

  @media screen and (max-width: 1000px) {
    max-width: 500px !important;
  }

  @media screen and (max-width: 657px) {
    max-width: 100% !important;

    .slick-arrow.slick-prev {
      display: none !important;
    }

    .slick-arrow.slick-next {
      display: none !important;
    }
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
