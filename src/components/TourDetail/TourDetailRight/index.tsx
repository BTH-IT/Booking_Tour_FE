import { Form } from 'antd';
import { RuleObject } from 'antd/es/form';
import { CalendarChangeEvent } from 'primereact/calendar';
import { useCallback, useEffect, useState } from 'react';
import {
  AiOutlineLike,
  AiOutlinePhone,
  AiOutlineStar,
  AiOutlineTag,
} from 'react-icons/ai';
import { MdOutlineMailOutline } from 'react-icons/md';
import { TbFreeRights } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ISchedule, ITour } from 'tour';

import * as Styles from './styles';

import CalendarInput from '@/components/CalendarInput';
import CustomButton from '@/components/CustomButton';
import InputFormItem from '@/components/Input/InputFormItem';
import useDidMount from '@/hooks/useDidMount';
import useSignalR from '@/hooks/useSignalR';
import { useAppSelector } from '@/redux/hooks';
import tourService from '@/services/TourService';

const TourDetailRight = (props: ITour) => {
  const signalSchedule = useSignalR('ScheduleUpdateEvent');

  const [dates, setDates] = useState<Date[] | null>(null);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [schedule, setSchedule] = useState<ISchedule | null>(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const { id, price, salePercent, maxGuests } = props;
  const user = useAppSelector((state) => state.auth.user);
  const [form] = Form.useForm();
  const [seatsAvailable, setSeatsAvailable] = useState(maxGuests);
  const [inWishList, setInWishList] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const tourJSON = localStorage.getItem('tour-wish-list');
    if (tourJSON) {
      const tourList: ITour[] = JSON.parse(tourJSON);
      setInWishList(tourList.some((tour) => tour.id === props.id));
    }
    setMounted(true);
  }, [props.id]);

  const addToWishListHandler = () => {
    const tourJSON = localStorage.getItem('tour-wish-list');
    if (tourJSON) {
      const tourList: ITour[] = JSON.parse(tourJSON);
      if (tourList.some((tour) => tour.id === props.id)) {
        return;
      }
      tourList.push(props);
      localStorage.setItem('tour-wish-list', JSON.stringify(tourList));
    } else {
      localStorage.setItem('tour-wish-list', JSON.stringify([props]));
    }
    setInWishList(true);
  };

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
                  new Date(schedule.dateEnd).getTime() === date.getTime()
              )
          )
      );

    setDisabledDates(disabledDatesArray); // Finalized disabled dates
    setSchedules(data);
  });

  const validationSeats = useCallback(
    (rule: RuleObject, value: any, callback: (error?: string) => void) => {
      const available = signalSchedule
        ? signalSchedule.scheduleId == schedule?.id
          ? signalSchedule.availableSeats
          : seatsAvailable
        : seatsAvailable;
      if (value <= available && value > 0) {
        return callback();
      }
      return callback(
        `Only ${available} seats left and seats must be greater than 0`
      );
    },
    [seatsAvailable, signalSchedule, schedule]
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
        })
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
                  newDate.setHours(0, 0, 0, 0);
                  selectedDate.setHours(0, 0, 0, 0);
                  return newDate.getTime() === selectedDate.getTime();
                });

                console.log(matchingSchedule);

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
            {schedule ? (
              <div className="text-xl">
                Available:{' '}
                {signalSchedule
                  ? signalSchedule.scheduleId == schedule.id
                    ? signalSchedule.availableSeats
                    : seatsAvailable
                  : seatsAvailable}{' '}
                seats
              </div>
            ) : (
              <div className="text-xl">Please select a schedule</div>
            )}
          </Styles.TourDetailRightBookingFormAvailable>
          <InputFormItem
            name="numOfPeople"
            label="Number of people"
            type="number"
            min="0"
            max={
              signalSchedule
                ? signalSchedule.scheduleId == schedule?.id
                  ? signalSchedule.availableSeats
                  : seatsAvailable
                : seatsAvailable
            }
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
        <Styles.TourDetailRightBookingInfo></Styles.TourDetailRightBookingInfo>
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
