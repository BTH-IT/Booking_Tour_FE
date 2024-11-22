import { Rate } from 'antd';
import { useState } from 'react';
import { IReview } from 'review';
import { IUser } from 'user';

import * as Styles from './styles';

import useDidMount from '@/hooks/useDidMount';
import userService from '@/services/UserService';
import { formatDate, logError } from '@/utils/constants';

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
        <img src={user?.avatar || '/avatar.png'} alt="avatar" />
      </Styles.ReviewsContentItemImg>
      <Styles.ReviewsContentItemName>
        {user?.fullname}
      </Styles.ReviewsContentItemName>
      <Styles.ReviewsContentItemInfo>
        <p>{content}</p>
        <Rate allowHalf defaultValue={rating} disabled />
        <p>{formatDate(createdAt)}</p>
      </Styles.ReviewsContentItemInfo>
    </Styles.ReviewsContentItem>
  ) : (
    <></>
  );
};

export default Review;
