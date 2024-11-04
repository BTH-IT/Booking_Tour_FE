import { Col, Form, Rate, Row } from 'antd';
import * as Styles from './styles';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import InputFormItem from '../Input/InputFormItem';
import CustomButton from '../CustomButton';
import { ITour } from 'tour';
import { toast } from 'react-toastify';
import tourService from '@/services/TourService';
import { v4 as uuidv4 } from 'uuid';
import { KEY_LOCALSTORAGE, logError } from '@/utils/constants';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/authSlice';
import Review from './Review';
import { useState } from 'react';
import { IRoom } from 'room';
import roomService from '@/services/RoomService';
import { IReview } from 'review';

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

  const onFinish = async (values: { rating: number; content: string }) => {
    try {
      await tourService.updateTour(
        {
          ...props,
          reviewList: [
            {
              ...values,
              id: uuidv4(),
              userId: user.id,
              createdAt: new Date(),
              tourId: props.id,
              updatedAt: null,
            },
            ...reviewList,
          ],
        },
        props.id
      );

      setReviews([
        {
          ...values,
          id: uuidv4(),
          userId: user.id,
          createdAt: new Date(),
          tourId: props.id,
          updatedAt: null,
        },
        ...reviewList,
      ]);

      toast.success('Review Success!!');
    } catch (error) {
      logError(error);
    }
  };
  return (
    <Styles.ReviewsWrapper id='reviewList'>
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
          onFinish={() => onFinish}
        >
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={12} md={8} xl={6}>
              <Form.Item name='rating' rules={[{ required: true }]}>
                <Rate allowHalf />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={16} xl={18}>
              <InputFormItem
                label=''
                name='content'
                placeholder='Enter your review...'
                rules={[{ required: true }]}
              />
            </Col>
          </Row>
          <CustomButton
            htmlType='submit'
            type='primary'
            width='100%'
            height='60px'
          >
            Submit
          </CustomButton>
        </Styles.ReviewsCommentForm>
      )}

      <Styles.ReviewsContent>
        {reviewList.map((review) => (
          <Review {...review} key={review.id} />
        ))}
      </Styles.ReviewsContent>
    </Styles.ReviewsWrapper>
  );
};

export const RoomReviews = (props: IRoom) => {
  const [reviews, setReviews] = useState<IReview[]>(props.reviews);
  const isLogged = Boolean(localStorage.getItem(KEY_LOCALSTORAGE.CURRENT_USER));
  const user = useAppSelector(selectAuth).user;

  const onFinish = async (values: { rating: number; content: string }) => {
    try {
      await roomService.updateRoom(props.id, {
        ...props,
        reviews: [
          {
            ...values,
            id: uuidv4(),
            userId: user.id,
            createdAt: new Date(),
            roomId: props.id,
            updatedAt: null,
          },
          ...reviews,
        ],
      });

      setReviews([
        {
          ...values,
          id: uuidv4(),
          userId: user.id,
          createdAt: new Date(),
          roomId: props.id,
          updatedAt: null,
        },
        ...reviews,
      ]);

      toast.success('Review Success!!');
    } catch (error) {
      logError(error);
    }
  };
  return (
    <Styles.RoomReviewsWrapper id='reviews'>
      <Styles.ReviewsHeader>
        <Styles.ReviewsCount>{reviews.length} Reviews</Styles.ReviewsCount>
        <Styles.ReviewsHeaderSort>
          <span>Sort By:</span>
          <Styles.ReviewsHeaderSortRating>
            Rating <BiSolidDownArrow />
          </Styles.ReviewsHeaderSortRating>
          <Styles.ReviewsHeaderSortDate>
            Date <BiSolidUpArrow />
          </Styles.ReviewsHeaderSortDate>
        </Styles.ReviewsHeaderSort>
      </Styles.ReviewsHeader>
      {isLogged && (
        <Styles.ReviewsCommentForm
          initialValues={{
            rating: 0,
            content: '',
          }}
          onFinish={() => onFinish}
        >
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={12} md={8} xl={6}>
              <Form.Item name='rating' rules={[{ required: true }]}>
                <Rate allowHalf />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={16} xl={18}>
              <InputFormItem
                label=''
                name='content'
                placeholder='Enter your review...'
                rules={[{ required: true }]}
              />
            </Col>
          </Row>
          <CustomButton
            htmlType='submit'
            type='primary'
            width='100%'
            height='60px'
          >
            Submit
          </CustomButton>
        </Styles.ReviewsCommentForm>
      )}

      <Styles.ReviewsContent>
        {reviews.map((review) => (
          <Review {...review} key={review.id} />
        ))}
      </Styles.ReviewsContent>
    </Styles.RoomReviewsWrapper>
  );
};
