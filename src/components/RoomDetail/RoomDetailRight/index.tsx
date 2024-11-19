import { DatePickerProps, Form } from 'antd';
import { RuleObject } from 'antd/es/form';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IRoom } from 'room';

import * as Styles from './styles';

import bookingService from '@/services/BookingService';
import { logError } from '@/utils/constants';

dayjs.extend(isBetween);

interface ISchedule {
  checkIn: Date;
  checkOut: Date;
}

const RoomDetailRight = (props: IRoom) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const { id, maxGuests } = props;
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<{
    schedule: [Dayjs, Dayjs] | null;
    adults: number;
    children: number;
  }>({
    schedule: null,
    adults: 1,
    children: 0,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const fetchSchedule = async () => {
    try {
      const res = await bookingService.getOccupiedSchedule(id);
      if (res) {
        setSchedules(res.result.data);
      }
    } catch (e) {
      logError(e);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [id]);

  useEffect(() => {
    // Check if all required fields are filled
    const isValid =
      formData.schedule !== null &&
      formData.adults >= 1 &&
      formData.children >= 0 &&
      formData.adults + formData.children <= maxGuests;
    setIsFormValid(isValid);
  }, [formData]);

  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null],
    dateStrings: [string, string],
    info: any
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      schedule: dates[0] && dates[1] ? [dates[0], dates[1]] : null,
    }));
  };

  const disabledDayList = useMemo(() => {
    // eg: checkIn:2024-11-01 -> checkOut:2024-11-10 => [2024-11-01, 2024-11-02, ..., 2024-11-10]
    let disabledDays: Dayjs[] = [];

    schedules.forEach((s) => {
      const startTimestamp = dayjs(s.checkIn).valueOf();
      const endTimestamp = dayjs(s.checkOut).valueOf();
      const dayInMillis = 24 * 60 * 60 * 1000; // Milliseconds in a day
      const dateArray = [];

      for (
        let timestamp = startTimestamp;
        timestamp <= endTimestamp;
        timestamp += dayInMillis
      ) {
        dateArray.push(dayjs(timestamp));
      }

      disabledDays = [...disabledDays, ...dateArray];
    });

    return disabledDays;
  }, [schedules]);

  // Function to check if a date is in the schedules array
  const isDateInDisabled = (date: Dayjs): boolean => {
    return disabledDayList.some((d) => d.isSame(date, 'day'));
  };

  // Function to check if a date range contains any dates from the schedules array
  const isRangeOverlappingDisabled = (
    startDate: Dayjs,
    endDate: Dayjs
  ): boolean => {
    return disabledDayList.some((d) =>
      d.isBetween(startDate, endDate, 'day', '[]')
    );
  };

  const calculateDisabledDayRange: DatePickerProps['disabledDate'] = (
    current,
    { from }
  ) => {
    if (from) {
      return (
        isDateInDisabled(current) || isRangeOverlappingDisabled(from, current)
      );
    }
    return isDateInDisabled(current);
  };

  const addHours = (day: Dayjs, hours: number) => {
    return day.add(hours, 'hour');
  };

  const onFinish = (values: any) => {
    if (
      formData.schedule &&
      formData.schedule[0].isSame(formData.schedule[1])
    ) {
      toast.warning('Check in and Check out date cannot be the same');
      return;
    }

    if (formData.schedule && formData.schedule[0] && formData.schedule[1]) {
      const adjustedSchedule = formData.schedule.map((date) =>
        addHours(date, 7)
      );

      localStorage.setItem(
        'room_payment',
        JSON.stringify({
          schedule: adjustedSchedule,
          adults: formData.adults,
          children: formData.children,
          ...props,
        })
      );
      navigate('/room-payment');
    }
  };

  const validationAdult = (rule: RuleObject, value: Number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const amount = Number(value);
      setFormData((prevFormData) => {
        const newFormData = {
          ...prevFormData,
          adults: amount,
        };
        if (amount + newFormData.children <= maxGuests) {
          resolve();
        } else {
          reject(`You can only book a maximum of ${maxGuests} guests`);
        }
        return newFormData;
      });
    });
  };

  const validationChildren = (rule: RuleObject, value: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      const amount = Number(value);
      setFormData((prevFormData) => {
        const newFormData = {
          ...prevFormData,
          children: amount,
        };
        if (amount + newFormData.adults <= maxGuests) {
          resolve();
        } else {
          reject(`You can only book a maximum of ${maxGuests} guests`);
        }
        return newFormData;
      });
    });
  };

  return (
    <Styles.RoomDetailRightWrapper>
      <Styles.RoomDetailRightBooking>
        <Styles.RoomDetailRightBookingTitle>
          <span>Book Your Room</span>
        </Styles.RoomDetailRightBookingTitle>
        <Styles.RoomDetailRightBookingForm
          form={form}
          layout="vertical"
          initialValues={{ adults: 1, children: 0 }}
          onFinish={onFinish}
        >
          <Styles.RoomDetailRightBookingLabel>
            Check In - Check Out
          </Styles.RoomDetailRightBookingLabel>
          <Styles.RoomDetailRightBookingFormDate
            name="date"
            rules={[{ required: true }]}
          >
            <Styles.RoomDetailDateRangePicker
              disabledDate={calculateDisabledDayRange}
              minDate={dayjs()}
              onCalendarChange={handleDateChange}
            />
          </Styles.RoomDetailRightBookingFormDate>
          <Styles.RoomDetailRightBookingLabel>
            Adults
          </Styles.RoomDetailRightBookingLabel>
          <Styles.FormInputWrapper>
            <Styles.InputItem
              name="adults"
              type="number"
              min="1"
              rules={[
                {
                  required: true,
                  validator: validationAdult,
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
          </Styles.FormInputWrapper>
          <Styles.RoomDetailRightBookingLabel>
            Children
          </Styles.RoomDetailRightBookingLabel>
          <Styles.FormInputWrapper>
            <Styles.InputItem
              name="children"
              type="number"
              min="0"
              rules={[
                {
                  required: true,
                  validator: validationChildren,
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
          </Styles.FormInputWrapper>
          <Styles.BookingButton
            htmlType="submit"
            type="primary"
            border_radius="4px"
            width="100%"
            height="60px"
            disabled={!isFormValid}
          >
            PROCEED BOOKING
          </Styles.BookingButton>
        </Styles.RoomDetailRightBookingForm>
      </Styles.RoomDetailRightBooking>
    </Styles.RoomDetailRightWrapper>
  );
};

export default RoomDetailRight;
