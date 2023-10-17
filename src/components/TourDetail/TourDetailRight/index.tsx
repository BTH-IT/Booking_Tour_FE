import { ITour } from 'tour';
import * as Styles from './styles';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLike,
  AiOutlinePhone,
  AiOutlineStar,
  AiOutlineTag,
} from 'react-icons/ai';
import CalendarInput from '@/components/CalendarInput';
import { useState } from 'react';
import { Form } from 'antd';
import {
  CalendarChangeEvent,
  CalendarDateTemplateEvent,
} from 'primereact/calendar';
import CustomButton from '@/components/CustomButton';
import { TbFreeRights } from 'react-icons/tb';
import { MdOutlineMailOutline } from 'react-icons/md';
import InputFormItem from '@/components/Input/InputFormItem';

const dateTemplate = (date: CalendarDateTemplateEvent) => {
  if (date.day > 20 && date.day < 30) {
    return <s style={{ textDecoration: 'line-through' }}>{date.day}</s>;
  }

  return date.day;
};

const TourDetailRight = (props: ITour) => {
  const [form] = Form.useForm();
  const [date, setDate] = useState<Date[]>([]);
  const { price, salePercent } = props;
  const [seatsAvailable, setSeatsAvailable] = useState(props.maxGuests);

  return (
    <Styles.TourDetailRightWrapper>
      <Styles.TourDetailRightBooking>
        <Styles.TourDetailRightBookingTitle>
          Price
        </Styles.TourDetailRightBookingTitle>
        <Styles.TourDetailRightBookingPrice>
          <AiOutlineTag />
          <span>From</span>
          {salePercent > 0 ? (
            <>
              <s>${price}</s>
              <p>${price - (price * salePercent) / 100}</p>
            </>
          ) : (
            <p>${price}</p>
          )}
        </Styles.TourDetailRightBookingPrice>
        <Styles.TourDetailRightBookingForm form={form} layout="vertical">
          <Styles.TourDetailRightBookingFormDate name="date">
            <CalendarInput
              value={date}
              onChange={(e: CalendarChangeEvent) => {
                setDate(e.value as Date[]);
              }}
              minDate={new Date()}
              disabledDates={[new Date('10/20/2023')]}
              selectionMode="range"
            />
          </Styles.TourDetailRightBookingFormDate>
          <Styles.TourDetailRightBookingFormAvailable>
            Available: {seatsAvailable} seats
          </Styles.TourDetailRightBookingFormAvailable>
          <InputFormItem
            name="numOfPeople"
            label="Number of people"
            type="number"
            min="0"
          />
          <CustomButton
            htmlType="submit"
            type="primary"
            border_radius="4px"
            width="100%"
            height="60px"
          >
            PROCEED BOOKING
          </CustomButton>
        </Styles.TourDetailRightBookingForm>
        <Styles.TourDetailRightBookingInfo>
          <Styles.TourDetailRightWishList>
            <AiOutlineHeart />
            {/* <AiFillHeart/> */}
            <span>Save To Wish List</span>
          </Styles.TourDetailRightWishList>
        </Styles.TourDetailRightBookingInfo>
      </Styles.TourDetailRightBooking>
      <Styles.TourDetailRightBookingWithConfidence>
        <Styles.TourDetailRightBookingTitle>
          Book With Confidence
        </Styles.TourDetailRightBookingTitle>
        <Styles.TourDetailRightBookingWithConfidenceItem>
          <AiOutlineLike />
          <span>No-hassle best price guarantee</span>
        </Styles.TourDetailRightBookingWithConfidenceItem>
        <Styles.TourDetailRightBookingWithConfidenceItem>
          <AiOutlinePhone />
          <span>Customer care available 24/7</span>
        </Styles.TourDetailRightBookingWithConfidenceItem>
        <Styles.TourDetailRightBookingWithConfidenceItem>
          <AiOutlineStar />
          <span>Hand-picked Tours & Activities</span>
        </Styles.TourDetailRightBookingWithConfidenceItem>
        <Styles.TourDetailRightBookingWithConfidenceItem>
          <TbFreeRights />
          <span>Free Travel Insureance</span>
        </Styles.TourDetailRightBookingWithConfidenceItem>
      </Styles.TourDetailRightBookingWithConfidence>
      <Styles.TourDetailRightNeedHelp>
        <Styles.TourDetailRightBookingTitle>
          Need Help?
        </Styles.TourDetailRightBookingTitle>
        <Styles.TourDetailRightNeedHelpItem>
          <AiOutlinePhone />
          <span>1.8445.3356.33</span>
        </Styles.TourDetailRightNeedHelpItem>
        <Styles.TourDetailRightNeedHelpItem>
          <MdOutlineMailOutline />
          <span>Help@goodlayers.com</span>
        </Styles.TourDetailRightNeedHelpItem>
      </Styles.TourDetailRightNeedHelp>
    </Styles.TourDetailRightWrapper>
  );
};

export default TourDetailRight;
