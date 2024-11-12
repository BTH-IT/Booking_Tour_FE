import { IBookingRoom } from 'booking';
import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bookingStatuses } from '@/constants/bookingStatus';
import bookingService from '@/services/BookingService';
import { formatDate, logError } from '@/utils/constants';

export default function DashboardRoomBooking() {
  const [bookings, setBookings] = useState<IBookingRoom[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [activeStatus, setActiveStatus] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingService.getCurrentUserBookingRooms();
        if (res) {
          setBookings(res.result);
        }
        setIsMounted(true);
      } catch (error) {
        logError(error);
      }
    };

    fetchBookings();
  }, []);
  console.log(bookings);

  return (
    <>
      {isMounted && (
        <section className="container px-16 py-5">
          <Tabs defaultValue="all" className="w-full bg-white">
            <TabsList className="w-fit bg-white h-fit grid-cols-3 lg:grid-cols-9">
              {bookingStatuses.map((status) => (
                <TabsTrigger
                  key={status}
                  className="border-l-[1px] border-gray-300 px-6 font-normal text-center text-[17px] text-gray-400 cursor-pointer underline-offset-8 !shadow-none data-[state=active]:text-blue-500 data-[state=active]:underline"
                  value={status.toLowerCase()}
                  onClick={() => setActiveStatus(status.toLowerCase())}
                >
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Table className="mt-10 border-2">
            <TableHeader className="border-solid border-b-[1px] border-gray-200">
              <TableRow>
                <TableHead className="text-2xl py-6 w-[40%]">
                  Room Name
                </TableHead>
                <TableHead className="text-2xl py-6 w-[25%]">
                  Check in - Check out
                </TableHead>
                <TableHead className="text-2xl py-6 w-[20%]">Total</TableHead>
                <TableHead className="text-2xl py-6 w-[15%]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.detailBookingRooms[0].room.images[0]}
                        alt="Room Image"
                        className="rounded-md w-28 h-28 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-xl text-blue-500">
                          {booking.detailBookingRooms[0].room.name}
                        </h3>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-xl">
                      {`${formatDate(booking.checkIn)} - ${formatDate(
                        booking.checkOut
                      )}`}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xl">{booking.priceTotal.toFixed(2)} $</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </>
  );
}
