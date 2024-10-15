import { ITour } from 'tour';
import * as Styles from './styles';
import { BsClockHistory, BsWifi } from 'react-icons/bs';
import { MdPeopleOutline } from 'react-icons/md';
import { IoCalendarNumberOutline } from 'react-icons/io5';

const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

const TourDetailHeader = (props: ITour) => {
  console.log(props);
  return (
    <Styles.TourDetailHeaderWrapper>
      <Styles.TourDetailHeaderName>
        <Styles.TourDetailHeaderTitle>
          {props.name}
        </Styles.TourDetailHeaderTitle>
        <Styles.TourDetailHeaderRate>
          {/* <Rate defaultValue={props.rate} disabled allowHalf /> */}
          <Styles.TourDetailHeaderReviews>
            ({props.reviewList.length} Reviews)
          </Styles.TourDetailHeaderReviews>
        </Styles.TourDetailHeaderRate>
      </Styles.TourDetailHeaderName>
      <Styles.TourDetailHeaderSubInfo>
        <Styles.TourDetailHeaderSubInfoItem>
          <BsClockHistory />
          <p>
            {props.dayList.length} Days {props.dayList.length - 1} Nights
          </p>
        </Styles.TourDetailHeaderSubInfoItem>
        <Styles.TourDetailHeaderSubInfoItem>
          <MdPeopleOutline />
          <p>Max Guests: {props.maxGuests}</p>
        </Styles.TourDetailHeaderSubInfoItem>
        <Styles.TourDetailHeaderSubInfoItem>
          <BsWifi />
          <p>{props.isWifi ? 'Wifi Available' : 'Wifi Unavailable'}</p>
        </Styles.TourDetailHeaderSubInfoItem>
        <Styles.TourDetailHeaderSubInfoItem>
          <IoCalendarNumberOutline />
          <p>
            {formatter.format(new Date(props.dateFrom))} -{' '}
            {formatter.format(new Date(props.dateTo))}
          </p>
        </Styles.TourDetailHeaderSubInfoItem>
      </Styles.TourDetailHeaderSubInfo>
    </Styles.TourDetailHeaderWrapper>
  );
};

export default TourDetailHeader;
