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
`;

export const CustomerReviewsTitle = styled.h3`
  font-size: 4rem;
  font-weight: 600;
  width: 100%;
  max-width: 30%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 60px;
`;

export const SliderStyled = styled(Slider)``;
