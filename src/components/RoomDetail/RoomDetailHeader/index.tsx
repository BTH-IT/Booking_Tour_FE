import { IRoom } from 'room';
import * as Styles from './styles';
import { Rate, Col } from 'antd';

const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

const RoomDetailHeader = (props: IRoom) => {
  return (
    <Styles.RoomDetailHeaderWrapper>
      <Styles.RoomDetailHeaderName>
        <Styles.RoomDetailHeaderTitle>
          {props.name}
        </Styles.RoomDetailHeaderTitle>
        <Styles.RoomDetailHeaderRate>
          <Rate defaultValue={props.rate} disabled allowHalf />
          <Styles.RoomDetailHeaderReviews>
            ({props.reviewList.length} Reviews)
          </Styles.RoomDetailHeaderReviews>
        </Styles.RoomDetailHeaderRate>
      </Styles.RoomDetailHeaderName>
      <Styles.RoomDetailHeaderSubInfo>
        <Styles.RoomDetailHeaderSubInfoItem>
          <Styles.RoomDetailHeaderSubInfoCol xs={24} md={8}>
            <Styles.KingBedOutlined />
            <Styles.RoomDetailHeaderSubInfoDetail>
              {props.bed}
            </Styles.RoomDetailHeaderSubInfoDetail>
          </Styles.RoomDetailHeaderSubInfoCol>
          <Styles.RoomDetailHeaderSubInfoCol xs={24} md={8}>
            <Styles.SpaceDashboardOutlined />
            <Styles.RoomDetailHeaderSubInfoDetail>
              {props.area} sqm
            </Styles.RoomDetailHeaderSubInfoDetail>
          </Styles.RoomDetailHeaderSubInfoCol>
          <Styles.RoomDetailHeaderSubInfoCol xs={24} md={8}>
            <Styles.CorporateFareOutlined />
            <Styles.RoomDetailHeaderSubInfoDetail>
              {props.view}
            </Styles.RoomDetailHeaderSubInfoDetail>
          </Styles.RoomDetailHeaderSubInfoCol>
        </Styles.RoomDetailHeaderSubInfoItem>
      </Styles.RoomDetailHeaderSubInfo>
    </Styles.RoomDetailHeaderWrapper>
  );
};

export default RoomDetailHeader;
