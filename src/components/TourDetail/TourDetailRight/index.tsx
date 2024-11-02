import { ISchedule, ITour } from 'tour';
import * as Styles from './styles';
import {
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
import { RuleObject } from 'antd/es/form';
import { useNavigate } from 'react-router';
import { useAppSelector } from '@/redux/hooks';
import { toast } from 'react-toastify';

const TourDetailRight = (props: ITour) => {
  const [dates, setDates] = useState<Date[] | null>(null);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [schedule, setSchedule] = useState<ISchedule | null>(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const { id, price, salePercent, maxGuests } = props;
  const user = useAppSelector((state) => state.auth.user);
  const [form] = Form.useForm();
  const [seatsAvailable, setSeatsAvailable] = useState(maxGuests);
  const navigate = useNavigate();

  useDidMount(async () => {
    const res = await tourService.getSchedulesOfTour(id);
    const data = res.result;

    if (!data) return;

    const newData = data
      .filter((item) => {
        const date = new Date(item.dateStart);
        const dateFrom = new Date(props.dateFrom);
        const dateTo = new Date(props.dateTo);
        return date >= dateFrom && date <= dateTo;
      })
      .map((item) => {
        const date = new Date(item.dateStart);
        date.setHours(0, 0, 0, 0);
        return date;
      });

    const allDates = [];
    const dateFrom = new Date(props.dateFrom);
    const dateTo = new Date(props.dateTo);

    for (let d = new Date(dateFrom); d <= dateTo; d.setDate(d.getDate() + 1)) {
      allDates.push(new Date(d).setHours(0, 0, 0, 0));
    }

    const disabledDatesArray = allDates
      .map((timestamp) => new Date(timestamp))
      .filter(
        (date) =>
          !newData.some(
            (allowedDate) =>
              allowedDate.getTime() === date.getTime() ||
              data.some(
                (schedule) =>
                  new Date(schedule.dateEnd).getTime() === date.getTime(),
              ),
          ),
      );

    setDisabledDates(disabledDatesArray); // Finalized disabled dates
    setSchedules(data);
  });

  const validationSeats = useCallback(
    (rule: RuleObject, value: any, callback: (error?: string) => void) => {
      if (value <= seatsAvailable && value > 0) {
        return callback();
      }
      return callback(
        `Only ${seatsAvailable} seats left and seats must be greater than 0`,
      );
    },
    [seatsAvailable],
  );

  const onFinish = (values: any) => {
    if (!user) {
      toast.error('Please login to book tour');
      return;
    }

    if (schedule) {
      localStorage.setItem(
        'tour_payment',
        JSON.stringify({
          schedule,
          seats: values.numOfPeople,
          ...props,
        }),
      );

      navigate('/tour-payment');
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
          layout="vertical"
          initialValues={{ numOfPeople: 0 }}
          onFinish={onFinish}
        >
          <Styles.TourDetailRightBookingFormDate
            name="date"
            rules={[{ required: true }]}
          >
            <CalendarInput
              onChange={(e: CalendarChangeEvent) => {
                const selectedDate = (e.value as Date[])[0];

                const matchingSchedule = schedules.find((value) => {
                  const newDate = new Date(value.dateStart);
                  selectedDate.setHours(10, 0, 0, 0);
                  return newDate.getTime() === selectedDate.getTime();
                });

                if (matchingSchedule) {
                  const newEndDate = new Date(matchingSchedule.dateEnd);
                  newEndDate.setHours(10, 0, 0, 0);

                  console.log(matchingSchedule);

                  (e.value as Date[])[1] = newEndDate;

                  setDates([selectedDate, newEndDate]);
                  setSchedule(matchingSchedule);
                  setSeatsAvailable(matchingSchedule.availableSeats);
                } else {
                  e.value = [];
                  setDates(null);
                  setSchedule(null);
                }
              }}
              value={dates}
              disabledDates={disabledDates}
              minDate={new Date(new Date(props.dateFrom).setHours(0, 0, 0, 0))}
              maxDate={new Date(new Date(props.dateTo).setHours(0, 0, 0, 0))}
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
            max={seatsAvailable}
            rules={[{ validator: validationSeats }]}
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
          <span>Hand-picked Tours & activities</span>
        </Styles.TourDetailRightBookingWithConfidenceItem>
        <Styles.TourDetailRightBookingWithConfidenceItem>
          <TbFreeRights />
          <span>Free Travel Insurance</span>
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
