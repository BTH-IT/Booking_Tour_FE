import { useState } from 'react';
import Slider from 'react-slick';
import { IReview } from 'review';
import { IUser } from 'user';

import CustomerReview from '../Card/CustomerReview';

import * as Styles from './styles';

import { logError } from '@/utils/constants';
import userService from '@/services/UserService';
import tourService from '@/services/TourService';
import useDidMount from '@/hooks/useDidMount';

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

export type CustomerReviews = IReview & {
  user: IUser;
};

const CustomerReviews = () => {
  const [reviewList, setReviews] = useState<CustomerReviews[]>([]);

  async function handleFetchReviews() {
    try {
      const res = await tourService.getAllReviews();
      const customerReviews: CustomerReviews[] = await Promise.all(
        res.result.map(async (review: IReview) => {
          const user = await userService.getUser(review.userId);
          return { ...review, user: user.result };
        })
      );

      setReviews(customerReviews);
    } catch (error) {
      logError(error);
    }
  }

  useDidMount(() => {
    handleFetchReviews();
  });

  return (
    <Styles.CustomerReviewsWrapper>
      <Styles.CustomerReviewsTitle>
        What our customers are saying about us
      </Styles.CustomerReviewsTitle>

      <Slider {...settings}>
        {reviewList.map((customerReview) => (
          <CustomerReview
            key={customerReview.id}
            fullname={customerReview.user.fullname}
            rate={customerReview.rating}
            content={customerReview.content}
            avatar={customerReview.user.picture || '/avatar.png'}
          />
        ))}
      </Slider>
    </Styles.CustomerReviewsWrapper>
  );
};

export default CustomerReviews;
