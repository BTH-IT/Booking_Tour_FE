import { ITour } from 'tour';
import * as Styles from './styles';
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineLike,
  AiOutlinePhone,
  AiOutlineStar,
  AiOutlineTag,
} from 'react-icons/ai';
import CalendarInput from '@/components/CalendarInput';
import { useState } from 'react';
import { Form } from 'antd';
import { CalendarChangeEvent } from 'primereact/calendar';
import SelectFormItem from '@/components/Select/SelectFormItem';
import CustomButton from '@/components/CustomButton';
import { TbFreeRights } from 'react-icons/tb';
import { MdOutlineMailOutline } from 'react-icons/md';

const TourDetailRight = (props: ITour) => {
  const [form] = Form.useForm();
  const [date, setDate] = useState(new Date());

  return (
    <Styles.TourDetailRightWrapper>
      <Styles.TourDetailRightBooking>
        <Styles.TourDetailRightBookingTitle>
          Price
        </Styles.TourDetailRightBookingTitle>
        <Styles.TourDetailRightBookingPrice>
          <AiOutlineTag />
          <span>From</span>
          <p>$1,200</p>
        </Styles.TourDetailRightBookingPrice>
        <Styles.TourDetailRightBookingForm form={form}>
          <Styles.TourDetailRightBookingFormDate name="date">
            <CalendarInput
              value={date}
              onChange={(e: CalendarChangeEvent) => setDate(e.value as Date)}
              minDate={new Date()}
            />
          </Styles.TourDetailRightBookingFormDate>
          <Styles.TourDetailRightBookingFormAvailable>
            Available: 40 seats
          </Styles.TourDetailRightBookingFormAvailable>
          <SelectFormItem name="numOfPeople" label="" options={[]} />
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
          <Styles.TourDetailRightNumView>
            <AiOutlineEye />
            <span>6424</span>
          </Styles.TourDetailRightNumView>
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
