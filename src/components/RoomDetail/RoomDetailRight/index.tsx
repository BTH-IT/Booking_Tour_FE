import { IRoom } from 'room';
import * as Styles from './styles';
import { useCallback, useState } from 'react';
import { Form } from 'antd';
import InputFormItem from '@/components/Input/InputFormItem';
import useDidMount from '@/hooks/useDidMount';
import roomService from '@/services/RoomService';
import { getDaysInMonth } from '@/utils/constants';
import { RuleObject } from 'antd/es/form';
import { useNavigate } from 'react-router';
import { CalendarChangeEvent } from 'primereact/calendar';
import CalendarInput from '@/components/CalendarInput';

const RoomDetailRight = (props: IRoom) => {
  const [dates, setDates] = useState<Date[]>([]);
  // const [schedules, setSchedules] = useState<ISchedule[]>([]);
  // const [schedule, setSchedule] = useState<ISchedule | null>(null);
  // const { id, price } = props;
  const [form] = Form.useForm();
  const [numOfRooms, setNumOfRooms] = useState(0);
  const navigate = useNavigate();

  // useDidMount(async () => {
  //   const data = await roomService.getSchedulesOfRoom(id);
  //   if (!data) return;

  //   setSchedules(data);
  // });

  // const calculateAvailableRooms = (checkIn: Date, checkOut: Date) => {
  //   let availableRooms = maxRooms;

  //   // Kiểm tra từng booking trong mảng
  //   for (const schedule of schedules) {
  //     const scheduleStart = new Date(schedule.checkIn);
  //     const scheduleEnd = new Date(schedule.checkOut);
  //     const requestedStart = new Date(checkIn);
  //     const requestedEnd = new Date(checkOut);

  //     // Kiểm tra xem nếu ngày đặt phòng yêu cầu nằm trong khoảng thời gian đã đặt
  //     if (
  //       (requestedStart >= scheduleStart && requestedStart < scheduleEnd) ||
  //       (requestedEnd > scheduleStart && requestedEnd <= scheduleEnd) ||
  //       (requestedStart <= scheduleStart && requestedEnd >= scheduleEnd)
  //     ) {
  //       // Nếu có trùng khớp, giảm số phòng còn trống bằng số phòng đã đặt trong schedule này
  //       availableRooms -= schedule.roomQuantity;
  //     }
  //   }

  //   return setRoomsAvailable(availableRooms);
  // };

  // const validationRoom = useCallback(
  //   (rule: RuleObject, value: any): Promise<void> => {
  //     return new Promise((resolve, reject) => {
  //       if (value <= roomsAvailable && value > 0) {
  //         setNumOfRooms(value);
  //         resolve();
  //       } else {
  //         reject(
  //           `Only ${roomsAvailable} rooms left and number of rooms must be greater than 1`
  //         );
  //       }
  //     });
  //   },
  //   [roomsAvailable]
  // );

  const onFinish = (values: any) => {
    // if (schedule) {
    //   console.log(schedule);
    //   localStorage.setItem(
    //     'Room_payment',
    //     JSON.stringify({
    //       schedule,
    //       numOfRooms: values.numOfRooms,
    //       ...props,
    //     })
    //   );
    //   navigate('/payment');
    // }
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
          initialValues={{ numOfRoom: 1 }}
          onFinish={onFinish}
        >
          <Styles.RoomDetailRightBookingLabel>
            Check In - Check Out
          </Styles.RoomDetailRightBookingLabel>
          <Styles.RoomDetailRightBookingFormDate
            name="date"
            rules={[{ required: true }]}
          >
            <CalendarInput
              onChange={(e: CalendarChangeEvent) => {
                const checkIn = (e.value as Date[])[0];
                const checkOut = (e.value as Date[])[1];
                if (checkIn && checkOut) {
                  // calculateAvailableRooms(checkIn, checkOut);
                }
              }}
              disabledDates={dates}
              minDate={new Date()}
              selectionMode="range"
            />
          </Styles.RoomDetailRightBookingFormDate>
          <Styles.RoomDetailRightBookingLabel>
            Number of Rooms
          </Styles.RoomDetailRightBookingLabel>
          <Styles.InputItem
            name="numOfRoom"
            type="number"
            min="1"
            // max={roomsAvailable}
            // rules={[
            //   {
            //     validator: validationRoom,
            //   },
            // ]}
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
          <Styles.BookingButton
            htmlType="submit"
            type="primary"
            border_radius="4px"
            width="100%"
            height="60px"
          >
            PROCEED BOOKING
          </Styles.BookingButton>
        </Styles.RoomDetailRightBookingForm>
      </Styles.RoomDetailRightBooking>
    </Styles.RoomDetailRightWrapper>
  );
};

export default RoomDetailRight;
