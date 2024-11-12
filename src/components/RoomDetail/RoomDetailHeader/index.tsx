import { Rate } from 'antd';
import { IRoom } from 'room';

import * as Styles from './styles';

const formatter = new Intl.DateTimeFormat('vi', { month: 'short' });

const RoomDetailHeader = (props: IRoom) => {
  const rate = props.reviews
    ? props.reviews.reduce((acc, review) => acc + review.rating, 0) /
      props.reviews.length
    : 0;

  return (
    <Styles.RoomDetailHeaderWrapper>
      <Styles.RoomDetailHeaderName>
        <Styles.RoomDetailHeaderTitle>
          {props.name}
        </Styles.RoomDetailHeaderTitle>
        <Styles.RoomDetailHeaderRate>
          <Rate defaultValue={rate} disabled allowHalf />
          <Styles.RoomDetailHeaderReviews>
            ({props.reviews.length} Reviews)
          </Styles.RoomDetailHeaderReviews>
        </Styles.RoomDetailHeaderRate>
      </Styles.RoomDetailHeaderName>
      <Styles.RoomDetailHeaderSubInfo>
        <Styles.RoomDetailHeaderSubInfoItem>
          <Styles.RoomDetailHeaderSubInfoCol xs={24} md={8}>
            <Styles.MdPeopleOutlined />
            <Styles.RoomDetailHeaderSubInfoDetail>
              Max: {props.maxGuests} Guests
            </Styles.RoomDetailHeaderSubInfoDetail>
          </Styles.RoomDetailHeaderSubInfoCol>
        </Styles.RoomDetailHeaderSubInfoItem>
      </Styles.RoomDetailHeaderSubInfo>
    </Styles.RoomDetailHeaderWrapper>
  );
};

export default RoomDetailHeader;
