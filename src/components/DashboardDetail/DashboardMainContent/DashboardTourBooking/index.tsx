import { IBookingTour } from 'booking';
import { useEffect, useState } from 'react';

import Pagination from '@/components/Pagination';
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

const ITEMS_PER_PAGE = 4;

export default function DashboardTourBooking() {
  const [bookings, setBookings] = useState<IBookingTour[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [activeStatus, setActiveStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingService.getCurrentUserBookingTours();
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

  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const paginatedUsers = bookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
          <div className="!min-h-[523px]">
            <Table className="mt-10 border-2">
              <TableHeader className="border-solid border-b-[1px] border-gray-200">
                <TableRow>
                  <TableHead className="text-2xl py-6 w-[40%]">
                    Tour Name
                  </TableHead>
                  <TableHead className="text-2xl py-6 w-[25%]">
                    Travel Date
                  </TableHead>
                  <TableHead className="text-2xl py-6 w-[20%]">Total</TableHead>
                  <TableHead className="text-2xl py-6 w-[15%]">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <img
                          src={booking.schedule.tour.imageList[0]}
                          alt="Tour Image"
                          className="rounded-md w-28 h-28 object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-xl text-blue-500">
                            {booking.schedule.tour.name}
                          </h3>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-xl">
                        {`${formatDate(
                          booking.schedule.dateStart
                        )} - ${formatDate(booking.schedule.dateEnd)}`}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xl">
                        {booking.priceTotal.toFixed(2)} $
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </section>
      )}
    </>
  );
}
