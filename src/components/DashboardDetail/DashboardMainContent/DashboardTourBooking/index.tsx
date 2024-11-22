import { Tooltip } from 'antd';
import { IBookingTour } from 'booking';
import { Ban, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Pagination from '@/components/Pagination';
import PrintTourModal from '@/components/PrintTourModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import bookingService from '@/services/BookingService';
import { formatDate, logError } from '@/utils/constants';

const ITEMS_PER_PAGE = 4;

export default function DashboardTourBooking() {
  const [bookings, setBookings] = useState<IBookingTour[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [activeStatus, setActiveStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booking, setBooking] = useState<IBookingTour | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingService.getCurrentUserBookingTours();
        if (res) {
          setBookings(res.result.reverse());
        }
        setIsMounted(true);
      } catch (error) {
        logError(error);
      }
    };

    fetchBookings();
  }, []);
  console.log(bookings);

  const filteredBookings = bookings.filter(
    (booking) => activeStatus === 'all' || booking.status === activeStatus
  );

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const cancelBookingHandler = async (bookingId: string) => {
    try {
      const res = await bookingService.cancelBookingTour(bookingId);
      if (res) {
        toast.success('Cancel booking successfully');

        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: 'cancelled' }
              : booking
          )
        );
      }
    } catch (error) {
      logError(error);
    }
  };

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
                {paginatedBookings.map((booking) => (
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
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          'py-2 px-5',
                          booking.status === 'pending'
                            ? 'bg-yellow-50'
                            : booking.status === 'done'
                              ? 'bg-green-50'
                              : 'bg-red-50'
                        )}
                      >
                        <div className="text-lg">
                          {booking.status === 'pending' ? (
                            <span className="text-lg text-yellow-500">
                              Pending
                            </span>
                          ) : booking.status === 'done' ? (
                            <span className="text-lg text-green-500">Done</span>
                          ) : (
                            <span className="text-lg text-red-500">
                              Cancelled
                            </span>
                          )}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        <Tooltip title="Print invoice" placement="bottom">
                          <Button
                            variant="outline"
                            type="button"
                            className="text-white rounded-full w-12 h-12 p-3 bg-green-400 hover:bg-green-500 hover:text-white"
                            onClick={() => {
                              setIsModalOpen(true);
                              setBooking(booking);
                            }}
                          >
                            <Printer className="w-8 h-8" />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Cancel booking" placement="bottom">
                          <Button
                            variant="destructive"
                            type="button"
                            disabled={
                              booking.status !== 'pending' ||
                              new Date().getTime() -
                                new Date(booking.createAt).getTime() >
                                86400000
                            }
                            className="flex items-center space-x-2 rounded-3xl py-6"
                            onClick={() => {
                              cancelBookingHandler(booking.id);
                            }}
                          >
                            <Ban size={15} />
                          </Button>
                        </Tooltip>
                      </div>
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
          <PrintTourModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            booking={booking}
          />
        </section>
      )}
    </>
  );
}
