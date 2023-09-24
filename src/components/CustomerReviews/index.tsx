import * as Styles from './styles';
import CustomerReview from '../Card/CustomerReview';
import SliderBase from '../Slider/SliderBase';
import Slider from 'react-slick';

const customerReviews = [
  {
    avatar:
      'https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/07/P01-150x150.jpg',
    rate: 5,
    fullname: 'David',
    content:
      'The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my freind to join this company!',
  },
  {
    avatar:
      'https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/07/P02-150x150.jpg',
    rate: 5,
    fullname: 'Brittany Clark',
    content:
      'The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my freind to join this company!',
  },
  {
    avatar:
      'https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/07/P07-150x150.jpg',
    rate: 5,
    fullname: 'Frances Hill',
    content:
      'The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my freind to join this company!',
  },
  {
    avatar:
      'https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/07/P04-150x150.jpg',
    rate: 5,
    fullname: 'Jennth Norz',
    content:
      'The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my freind to join this company!',
  },
];

const settings = {
  className: 'center',
  centerMode: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 3,
  initialSlide: 0,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CustomerReviews = () => {
  return (
    <Styles.CustomerReviewsWrapper>
      <Styles.CustomerReviewsTitle>
        What our customers are saying about us
      </Styles.CustomerReviewsTitle>

      <Slider {...settings}>
        {customerReviews.map((customerReview) => (
          <CustomerReview
            key={customerReview.fullname}
            fullname={customerReview.fullname}
            rate={customerReview.rate}
            content={customerReview.content}
            avatar={customerReview.avatar}
          ></CustomerReview>
        ))}
      </Slider>
    </Styles.CustomerReviewsWrapper>
  );
};

export default CustomerReviews;
