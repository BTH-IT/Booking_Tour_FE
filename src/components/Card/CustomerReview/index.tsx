import React from 'react';
import * as Styles from './styles';
import { Rate } from 'antd';

interface ICustomerReviewProps {
  avatar: string;
  rate: number;
  fullname: string;
  content: string;
}

const CustomerReview: React.FC<ICustomerReviewProps> = ({
  avatar,
  rate,
  fullname,
  content,
}) => {
  return (
    <Styles.CustomerReviewWrapper>
      <Styles.CustomerReviewLeft>
        <Styles.CustomerReviewAvatar>
          <Styles.CustomerReviewAvatarImg
            src={avatar}
          ></Styles.CustomerReviewAvatarImg>
        </Styles.CustomerReviewAvatar>
      </Styles.CustomerReviewLeft>
      <Styles.CustomerReviewRight>
        <Styles.CustomerReviewHeader>
          <Styles.CustomerReviewName>{fullname}</Styles.CustomerReviewName>
          <Styles.CustomerReviewRate
            disabled
            defaultValue={rate}
          ></Styles.CustomerReviewRate>
        </Styles.CustomerReviewHeader>
        <Styles.CustomerReviewContent>{content}</Styles.CustomerReviewContent>
      </Styles.CustomerReviewRight>
    </Styles.CustomerReviewWrapper>
  );
};

export default CustomerReview;
