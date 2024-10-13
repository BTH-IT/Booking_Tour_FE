import { ISchedule, ITour } from 'tour';
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
import { useCallback, useState } from 'react';
import { Form } from 'antd';
import { CalendarChangeEvent } from 'primereact/calendar';
import CustomButton from '@/components/CustomButton';
import { TbFreeRights } from 'react-icons/tb';
import { MdOutlineMailOutline } from 'react-icons/md';
import InputFormItem from '@/components/Input/InputFormItem';
import useDidMount from '@/hooks/useDidMount';
import tourService from '@/services/TourService';
import { getDaysInMonth } from '@/utils/constants';
import { RuleObject } from 'antd/es/form';
import { useNavigate } from 'react-router';

const TourDetailRight = (props: ITour) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [schedule, setSchedule] = useState<ISchedule | null>(null);
  const { id, price, salePercent, maxGuests } = props;
  const [form] = Form.useForm();
  const [seatsAvailable, setSeatsAvailable] = useState(maxGuests);
  const navigate = useNavigate();

  useDidMount(async () => {
    const data = await tourService.getSchedulesOfTour(id);

    if (!data) return;
    const newData = data
      .filter((item) => {
        const date = new Date(item.dateStart);
        const currentDate = new Date();
        if (date.getMonth() === currentDate.getMonth()) {
          return date.getDate() >= currentDate.getDate();
        }
        return date.getMonth() > currentDate.getMonth();
      })
      .map((item) => {
        const date = new Date(item.dateStart);
        date.setDate(date.getDate() - 1);
        return date;
      });

    const currentDate = new Date();

    const dateRange = [];

    const dateTo = new Date(props.dateTo);

    for (let d = currentDate; d <= dateTo; d.setMonth(d.getMonth() + 1)) {
      const dayOfMonth = getDaysInMonth(d.getMonth(), d.getFullYear());

      dateRange.push(
        ...dayOfMonth.filter((day) => {
          return !newData.find(
            (newDate) => newDate.toString() === day.toString()
          );
        })
      );
    }

    setDates(dateRange);
    setSchedules(data);
  });

  const validationSeats = useCallback(
    (rule: RuleObject, value: any, callback: (error?: string) => void) => {
      if (value <= seatsAvailable && value > 0) {
        return callback();
      }
      return callback(
        `Only ${seatsAvailable} seats left and seats must be greater than 0`
      );
    },
    []
  );

  const onFinish = (values: any) => {
    if (schedule) {
      localStorage.setItem(
        'tour_payment',
        JSON.stringify({
          schedule,
          seats: values.numOfPeople,
          ...props,
        })
      );

      navigate('/payment');
    }
  };

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
        <Styles.TourDetailRightBookingForm
          form={form}
          layout='vertical'
          initialValues={{ numOfPeople: 0 }}
          onFinish={onFinish}
        >
          <Styles.TourDetailRightBookingFormDate
            name='date'
            rules={[{ required: true }]}
          >
            <CalendarInput
              onChange={(e: CalendarChangeEvent) => {
                const dateRange = schedules.find((value) => {
                  const newDate = new Date(value.dateStart);
                  newDate.setDate(newDate.getDate() - 1);
                  return (
                    newDate.toString() === (e.value as Date[])[0].toString()
                  );
                });

                if (dateRange) {
                  const newDate = new Date(dateRange.dateEnd);
                  newDate.setDate(newDate.getDate() - 1);
                  (e.value as Date[])[1] = newDate;
                  setSchedule(dateRange);
                  setSeatsAvailable(dateRange.availableSeats);
                } else {
                  e.value = [];
                  setSchedule(null);
                }
              }}
              disabledDates={dates}
              minDate={new Date()}
              maxDate={
                new Date(
                  new Date(props.dateTo).getFullYear(),
                  new Date(props.dateTo).getMonth() + 1,
                  0
                )
              }
              selectionMode='range'
            />
          </Styles.TourDetailRightBookingFormDate>
          <Styles.TourDetailRightBookingFormAvailable>
            Available: {seatsAvailable} seats
          </Styles.TourDetailRightBookingFormAvailable>
          <InputFormItem
            name='numOfPeople'
            label='Number of people'
            type='number'
            min='0'
            max={seatsAvailable}
            rules={[
              {
                validator: validationSeats,
              },
            ]}
            onKeyDown={(e) => {
              if (
                !(
                  (e.keyCode >= 48 && e.keyCode <= 57) ||
                  e.keyCode === 8 ||
                  (e.keyCode >= 37 && e.keyCode <= 40) ||
                  (e.keyCode >= 96 && e.keyCode <= 105) ||
                  e.ctrlKey
                )
              ) {
                e.preventDefault();
              }
            }}
          />
          <CustomButton
            htmlType='submit'
            type='primary'
            border_radius='4px'
            width='100%'
            height='60px'
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
