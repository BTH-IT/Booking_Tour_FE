import { Select } from 'antd';
import { IBookingTour } from 'booking';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/constants';

const BookingTableRow = ({
  booking,
  setBookings,
}: {
  booking: IBookingTour;
  setBookings: Dispatch<SetStateAction<IBookingTour[]>>;
}) => {
  const handleChangeStatus = (e: any) => {
    console.log(e);

    toast.success('Status updated successfully');
  };

  return (
    <>
      <TableRow key={booking.id}>
        <TableCell className="w-[10%] text-xl text-gray-600 py-7">
          {booking.id}
        </TableCell>
        <TableCell className="w-[20%] text-gray-600 text-ellipsis py-7">
          <span className="w-full text-xl line-clamp-1">
            {booking.schedule.tour.name}
          </span>
        </TableCell>
        <TableCell className="w-[20%] text-xl text-gray-600 text-ellipsis py-7">
          <span className="w-full text-xl line-clamp-1">
            {booking.priceTotal.toFixed(2) + ' $'}
          </span>
        </TableCell>
        <TableCell className="w-[20%] text-xl text-gray-600 py-7">
          {`${formatDate(
            booking.schedule.dateStart
          )} - ${formatDate(booking.schedule.dateEnd)}`}
        </TableCell>
        <TableCell className="w-[17%] text-xl text-gray-600 py-7">
          {booking.travellers.length + ' People'}
        </TableCell>
        <TableCell className="w-[20%] text-xl text-gray-600 py-7">
          <Select
            className="w-[100px]"
            defaultValue={'pending'}
            onChange={handleChangeStatus}
          >
            <Select.Option value="pending">Pending</Select.Option>
            {new Date(booking.schedule.dateEnd) < new Date() && (
              <Select.Option value="done">Done</Select.Option>
            )}
            {new Date(booking.schedule.dateStart) > new Date() && (
              <Select.Option value="cancelled">Cancelled</Select.Option>
            )}
          </Select>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BookingTableRow;
