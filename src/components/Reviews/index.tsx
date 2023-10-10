import { Form, Input, Rate, Select } from 'antd';
import * as Styles from './styles';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

const Reviews = () => {
  return (
    <Styles.ReviewsWrapper>
      <Styles.ReviewsHeader>
        <Styles.ReviewsCount>1 Reviews</Styles.ReviewsCount>
        <Styles.ReviewsHeaderSort>
          <span>Sort By:</span>
          <Styles.ReviewsHeaderSortRating>
            Rating <BiSolidDownArrow />
          </Styles.ReviewsHeaderSortRating>
          <Styles.ReviewsHeaderSortDate>
            Date <BiSolidUpArrow />
          </Styles.ReviewsHeaderSortDate>
          <Select
            defaultValue=""
            options={[
              {
                label: 'Filter by',
                value: '',
              },
            ]}
          />
        </Styles.ReviewsHeaderSort>
      </Styles.ReviewsHeader>
      <Styles.ReviewsCommentForm>
        <Form.Item></Form.Item>
        <Form.Item></Form.Item>
        <Form.Item></Form.Item>
      </Styles.ReviewsCommentForm>
      <Styles.ReviewsContent>
        <Styles.ReviewsContentItem>
          <Styles.ReviewsContentItemImg>
            <img src="/public/avatar.png" alt="avatar" />
          </Styles.ReviewsContentItemImg>
          <Styles.ReviewsContentItemName>
            Theodore Cook
          </Styles.ReviewsContentItemName>
          <Styles.ReviewsContentItemType>
            Solo <br /> Traveller
          </Styles.ReviewsContentItemType>
          <Styles.ReviewsContentItemInfo>
            <p>
              I am so happy, my dear friend, so absorbed in the exquisite sense
              of mere tranquil existence, that I neglect my talents.
            </p>
            <Rate allowHalf defaultValue={5} disabled />
            <p>May 25, 2022</p>
          </Styles.ReviewsContentItemInfo>
        </Styles.ReviewsContentItem>
      </Styles.ReviewsContent>
    </Styles.ReviewsWrapper>
  );
};

export default Reviews;
