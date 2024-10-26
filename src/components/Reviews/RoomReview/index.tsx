import { useState } from 'react';
import * as Styles from './styles';
import { Rate } from 'antd';
import { IReview } from 'review';
import useDidMount from '@/hooks/useDidMount';
import { IUser } from 'user';
import userService from '@/services/UserService';
import moment from 'moment';
import { logError } from '@/utils/constants';

const RoomReview = ({
  userId,
  content,
  rating,
  createdAt,
}: IReview & { userId: string; createdAt: Date }) => {
  const [user, setUser] = useState<IUser | null>();

  async function fetchUserId() {
    try {
      const res = await userService.getUser(userId);

      setUser(res.result);
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
        <img src={user?.picture || '/avatar.png'} alt="avatar" />
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

export default RoomReview;
