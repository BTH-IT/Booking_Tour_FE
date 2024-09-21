import Slider from 'react-slick';
import styled from 'styled-components';

export const CustomerReviewsWrapper = styled.section`
  padding: 90px 0px 60px 0px;
  background-image: url('https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/07/testimonial-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: black;

  & .slick-arrow {
    display: none !important;
  }

  & .center .slick-center .reviews {
    transition: all 400ms ease-in-out;
    transform: scale(1.1);
    z-index: 3;
    opacity: 1;
  }

  & .slick-slide,
  .slick-track,
  .slick-lick {
    padding: 10px;
  }

  & .slick-slide > div {
    padding: 20px;
  }

  & .center .reviews {
    opacity: 0.6;
  }

  @media screen and (max-width: 767px) {
    & .slick-slide > div {
      padding: 10px;
    }
  }

  @media screen and (max-width: 567px) {
    & .slick-slide > div {
      padding: 0px;
    }
  }
`;

export const CustomerReviewsTitle = styled.h3`
  font-size: 4rem;
  font-weight: 600;
  width: 100%;
  max-width: 30%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 60px;

  @media screen and (max-width: 767px) {
    max-width: 100%;
  }
`;
