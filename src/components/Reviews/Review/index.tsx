import React, { useState } from 'react';
import * as Styles from './styles';
import { Rate } from 'antd';
import { IReview } from 'review';
import useDidMount from '@/hooks/useDidMount';
import { IUser } from 'user';
import userService from '@/services/UserService';
import { toast } from 'react-toastify';
import moment from 'moment';
import { logError } from '@/utils/constants';

const Review = ({
  userId,
  content,
  rating,
  createdAt,
}: IReview & { userId: string; createdAt: Date }) => {
  const [user, setUser] = useState<IUser | null>();

  async function fetchUserId() {
    try {
      const data = await userService.getUser(userId);

      setUser(data.result);
    } catch (error) {
      logError(error);
    }
  }

  useDidMount(() => {
    fetchUserId();
  });

  return user ? (
    <Styles.ReviewsContentItem>
      <Styles.ReviewsContentItemImg>
        <img src={user?.fullname || '/avatar.png'} alt="avatar" />
      </Styles.ReviewsContentItemImg>
      <Styles.ReviewsContentItemName>
        {user?.fullname}
      </Styles.ReviewsContentItemName>
      <Styles.ReviewsContentItemInfo>
        <p>{content}</p>
        <Rate allowHalf defaultValue={rating} disabled />
        <p>{moment(createdAt).format('L')}</p>
      </Styles.ReviewsContentItemInfo>
    </Styles.ReviewsContentItem>
  ) : (
    <></>
  );
};

export default Review;
