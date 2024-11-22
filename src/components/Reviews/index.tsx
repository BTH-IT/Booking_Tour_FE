import { Form, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { IReview } from 'review';
import { IRoom } from 'room';
import { ITour } from 'tour';
import { v4 as uuidv4 } from 'uuid';

import CustomButton from '../CustomButton';

import Review from './Review';
import * as Styles from './styles';

import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import roomService from '@/services/RoomService';
import tourService from '@/services/TourService';
import { KEY_LOCALSTORAGE, logError } from '@/utils/constants';

export const TourReviews = (props: ITour) => {
  const [reviewList, setReviews] = useState<IReview[]>(props.reviewList);

  const isLogged = Boolean(localStorage.getItem(KEY_LOCALSTORAGE.CURRENT_USER));
  const [ratingOrderAsc, setRatingOrderAsc] = useState(true); // State cho hướng sắp xếp rating
  const [dateOrderAsc, setDateOrderAsc] = useState(false);
  const user = useAppSelector(selectAuth).user;

  const sortReviews = (order: 'rating' | 'date') => {
    const sortedReviews = [...reviewList].sort((a, b) => {
      if (order === 'rating') {
        return ratingOrderAsc ? a.rating - b.rating : b.rating - a.rating; // Sắp xếp theo rating
      } else {
        return dateOrderAsc
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sắp xếp theo date
      }
    });
    setReviews(sortedReviews);

    // Cập nhật trạng thái thứ tự
    if (order === 'rating') {
      setRatingOrderAsc(!ratingOrderAsc); // Chuyển đổi hướng sắp xếp
      setDateOrderAsc(false); // Đặt hướng sắp xếp ngày về mặc định
    } else {
      setDateOrderAsc(!dateOrderAsc); // Chuyển đổi hướng sắp xếp
      setRatingOrderAsc(false); // Đặt hướng sắp xếp rating về mặc định
    }
  };

  const onFinish = async (values: any) => {
    try {
      await tourService.createReview({
        ...values,
        id: uuidv4(),
        userId: user.id,
        createdAt: new Date(),
        tourId: props.id,
        UpdatedAt: null,
      });

      setReviews([
        {
          ...values,
          id: uuidv4(),
          userId: user.id,
          createdAt: new Date(),
          tourId: props.id,
          UpdatedAt: null,
        },
        ...reviewList,
      ]);

      toast.success('Review Success!!');
    } catch (error) {
      logError(error);
    }
  };
  return (
    <Styles.ReviewsWrapper id="reviewList">
      <Styles.ReviewsHeader>
        <Styles.ReviewsCount>{reviewList.length} Reviews</Styles.ReviewsCount>
        <Styles.ReviewsHeaderSort>
          <span>Sort By:</span>
          <Styles.ReviewsHeaderSortRating onClick={() => sortReviews('rating')}>
            Rating {ratingOrderAsc ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          </Styles.ReviewsHeaderSortRating>
          <Styles.ReviewsHeaderSortDate onClick={() => sortReviews('date')}>
            Date {dateOrderAsc ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          </Styles.ReviewsHeaderSortDate>
        </Styles.ReviewsHeaderSort>
      </Styles.ReviewsHeader>
      {isLogged && (
        <Styles.ReviewsCommentForm
          initialValues={{
            rating: 0,
            content: '',
          }}
          onFinish={onFinish}
        >
          <section className="mb-16">
            <Form.Item
              className="w-fit"
              name="rating"
              rules={[{ required: true }]}
            >
              <Rate allowHalf className="[&_.anticon-star]:text-[2.5rem]" />
            </Form.Item>
            <Form.Item name="content" rules={[{ required: true }]}>
              <TextArea rows={5} placeholder="Enter your review..." />
            </Form.Item>
          </section>
          <CustomButton
            htmlType="submit"
            type="primary"
            width="100%"
            height="60px"
          >
            Submit
          </CustomButton>
        </Styles.ReviewsCommentForm>
      )}

      <Styles.ReviewsContent>
        {reviewList.map((review, idx) => (
          <Review {...review} key={`${review.id} - ${idx}`} />
        ))}
      </Styles.ReviewsContent>
    </Styles.ReviewsWrapper>
  );
};

export const RoomReviews = (props: IRoom) => {
  const [reviews, setReviews] = useState<IReview[]>(props.reviews);
  const [ratingOrderAsc, setRatingOrderAsc] = useState(true); // State cho hướng sắp xếp rating
  const [dateOrderAsc, setDateOrderAsc] = useState(false);
  const isLogged = Boolean(localStorage.getItem(KEY_LOCALSTORAGE.CURRENT_USER));
  const user = useAppSelector(selectAuth).user;
  console.log('createdAt', reviews[0].createdAt);

  const sortReviews = (order: 'rating' | 'date') => {
    const sortedReviews = [...reviews].sort((a, b) => {
      if (order === 'rating') {
        return ratingOrderAsc ? a.rating - b.rating : b.rating - a.rating; // Sắp xếp theo rating
      } else {
        return dateOrderAsc
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sắp xếp theo date
      }
    });
    setReviews(sortedReviews);

    // Cập nhật trạng thái thứ tự
    if (order === 'rating') {
      setRatingOrderAsc(!ratingOrderAsc); // Chuyển đổi hướng sắp xếp
      setDateOrderAsc(false); // Đặt hướng sắp xếp ngày về mặc định
    } else {
      setDateOrderAsc(!dateOrderAsc); // Chuyển đổi hướng sắp xếp
      setRatingOrderAsc(false); // Đặt hướng sắp xếp rating về mặc định
    }
  };

  const onFinish = async (values: any) => {
    try {
      await roomService.createReview({
        id: uuidv4(),
        userId: user.id,
        createdAt: new Date(),
        roomId: props.id,
        UpdatedAt: null,
        deletedAt: null,
        ...values,
      });

      setReviews([
        {
          ...values,
          id: uuidv4(),
          userId: user.id,
          createdAt: new Date(),
          roomId: props.id,
          UpdatedAt: null,
          deletedAt: null,
        },
        ...reviews,
      ]);

      toast.success('Review Success!!');
    } catch (error) {
      logError(error);
    }
  };
  return (
    <Styles.RoomReviewsWrapper id="reviews">
      <Styles.ReviewsHeader>
        <Styles.ReviewsCount>{reviews.length} Reviews</Styles.ReviewsCount>
        <Styles.ReviewsHeaderSort>
          <span>Sort By:</span>
          <Styles.ReviewsHeaderSortRating onClick={() => sortReviews('rating')}>
            Rating {ratingOrderAsc ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          </Styles.ReviewsHeaderSortRating>
          <Styles.ReviewsHeaderSortDate onClick={() => sortReviews('date')}>
            Date {dateOrderAsc ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          </Styles.ReviewsHeaderSortDate>
        </Styles.ReviewsHeaderSort>
      </Styles.ReviewsHeader>
      {isLogged && (
        <Styles.ReviewsCommentForm
          initialValues={{
            rating: 0,
            content: '',
          }}
          onFinish={onFinish}
        >
          <section className="mb-16">
            <Form.Item
              className="w-fit"
              name="rating"
              rules={[{ required: true }]}
            >
              <Rate allowHalf className="[&_.anticon-star]:text-[2.5rem]" />
            </Form.Item>
            <Form.Item name="content" rules={[{ required: true }]}>
              <TextArea rows={5} placeholder="Enter your review..." />
            </Form.Item>
          </section>
          <CustomButton
            htmlType="submit"
            type="primary"
            width="100%"
            height="60px"
          >
            Submit
          </CustomButton>
        </Styles.ReviewsCommentForm>
      )}

      <Styles.ReviewsContent>
        {reviews.map((review, idx) => (
          <Review {...review} key={`${review.id} - ${idx}`} />
        ))}
      </Styles.ReviewsContent>
    </Styles.RoomReviewsWrapper>
  );
};
